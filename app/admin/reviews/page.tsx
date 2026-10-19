
"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import "./reviews-admin.css";

type Review = {
  id: string;
  name: string;
  project: string;
  rating: number;
  message: string;
  imageUrls: string[];
  approved: boolean;
  createdAt: string;
};

type Filter = "all" | "pending" | "approved";

type ApiResponse = {
  reviews?: Review[];
  review?: Review;
  error?: string;
  success?: boolean;
};

type ImagePreview = {
  images: string[];
  index: number;
  name: string;
};

export default function ReviewAdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<Filter>("pending");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [imagePreview, setImagePreview] =
    useState<ImagePreview | null>(null);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/reviews/admin", {
        method: "GET",
        cache: "no-store",
        credentials: "same-origin",
      });

      const data: ApiResponse = await response.json();

      if (response.status === 401) {
        setAuthenticated(false);
        setReviews([]);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Unable to load reviews.");
      }

      setReviews(data.reviews ?? []);
      setAuthenticated(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading reviews.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadReviews();
  }, [loadReviews]);

  useEffect(() => {
    if (!imagePreview) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setImagePreview(null);
      }

      if (event.key === "ArrowLeft") {
        setImagePreview((current) => {
          if (!current || current.images.length < 2) return current;

          return {
            ...current,
            index:
              (current.index - 1 + current.images.length) %
              current.images.length,
          };
        });
      }

      if (event.key === "ArrowRight") {
        setImagePreview((current) => {
          if (!current || current.images.length < 2) return current;

          return {
            ...current,
            index: (current.index + 1) % current.images.length,
          };
        });
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [imagePreview]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    try {
      const response = await fetch("/api/reviews/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed.");
      }

      setPassword("");
      await loadReviews();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to sign in.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoggingOut(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/reviews/logout", {
        method: "POST",
        credentials: "same-origin",
      });

      const data: ApiResponse = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to sign out. Please try again.",
        );
      }

      setAuthenticated(false);
      setReviews([]);
      setPassword("");
      setFilter("pending");
      setNotice("");
      setImagePreview(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to sign out.",
      );
    } finally {
      setLoggingOut(false);
    }
  }

  async function updateReview(review: Review) {
    setBusyId(review.id);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/reviews/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          id: review.id,
          approved: !review.approved,
        }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok || !data.review) {
        if (response.status === 401) {
          setAuthenticated(false);
          setReviews([]);
        }

        throw new Error(data.error || "Unable to update this review.");
      }

      const updatedReview = data.review;

      setReviews((current) =>
        current.map((item) =>
          item.id === updatedReview.id ? updatedReview : item,
        ),
      );

      setNotice(
        updatedReview.approved
          ? `Review from ${updatedReview.name} approved and published.`
          : `Review from ${updatedReview.name} hidden from the public website.`,
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update the review.",
      );
    } finally {
      setBusyId("");
    }
  }

  function openImagePreview(
    images: string[],
    index: number,
    name: string,
  ) {
    setImagePreview({ images, index, name });
  }

  function showPreviousImage() {
    setImagePreview((current) => {
      if (!current || current.images.length < 2) return current;

      return {
        ...current,
        index:
          (current.index - 1 + current.images.length) %
          current.images.length,
      };
    });
  }

  function showNextImage() {
    setImagePreview((current) => {
      if (!current || current.images.length < 2) return current;

      return {
        ...current,
        index: (current.index + 1) % current.images.length,
      };
    });
  }

  const pendingCount = reviews.filter(
    (review) => !review.approved,
  ).length;

  const approvedCount = reviews.filter(
    (review) => review.approved,
  ).length;

  const visibleReviews = reviews.filter((review) => {
    if (filter === "pending") return !review.approved;
    if (filter === "approved") return review.approved;
    return true;
  });

  if (loading && !authenticated) {
    return (
      <main className="review-admin">
        <section className="admin-login">
          <p className="admin-eyebrow">LHIMF / ADMINISTRATION</p>
          <h1>Review dashboard</h1>
          <p className="admin-muted">Checking your admin session...</p>
        </section>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="review-admin">
        <section className="admin-login">
          <p className="admin-eyebrow">LHIMF / ADMINISTRATION</p>
          <h1>Review dashboard</h1>
          <p className="admin-muted">
            Sign in to manage and approve customer reviews.
          </p>

          <form onSubmit={login} className="admin-login-form">
            <label htmlFor="admin-password">Admin password</label>

            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your admin password"
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {error && (
            <p className="admin-error" role="alert">
              {error}
            </p>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="review-admin">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">LHIMF / ADMINISTRATION</p>
          <h1>Client reviews</h1>
          <p className="admin-muted">
            Manage customer feedback before it appears on your public website.
          </p>
        </div>

        <button
          type="button"
          className="admin-button admin-button-light"
          onClick={() => void logout()}
          disabled={loggingOut}
        >
          {loggingOut ? "Signing out..." : "Sign out"}
        </button>
      </header>

      <section className="admin-stats" aria-label="Review statistics">
        <article className="admin-stat">
          <span>Total reviews</span>
          <strong>{reviews.length}</strong>
        </article>

        <article className="admin-stat">
          <span>Awaiting approval</span>
          <strong>{pendingCount}</strong>
        </article>

        <article className="admin-stat">
          <span>Published</span>
          <strong>{approvedCount}</strong>
        </article>
      </section>

      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}

      {notice && (
        <p className="admin-notice" role="status">
          {notice}
        </p>
      )}

      <nav className="admin-filters" aria-label="Filter reviews">
        {(
          [
            ["pending", "Pending"],
            ["approved", "Published"],
            ["all", "All reviews"],
          ] as [Filter, string][]
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={
              filter === value ? "admin-filter active" : "admin-filter"
            }
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
            {value === "pending" && ` (${pendingCount})`}
          </button>
        ))}

        <button
          type="button"
          className="admin-refresh"
          onClick={() => void loadReviews()}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </nav>

      <section
        className="admin-review-list"
        aria-label="Customer reviews"
        aria-live="polite"
      >
        {loading ? (
          <div className="admin-empty">
            <p className="admin-muted">Refreshing reviews...</p>
          </div>
        ) : visibleReviews.length === 0 ? (
          <div className="admin-empty">
            <h2>No reviews here</h2>
            <p className="admin-muted">
              {filter === "pending"
                ? "You're all caught up. There are no reviews waiting for approval."
                : filter === "approved"
                  ? "No reviews have been published yet."
                  : "Customer reviews will appear here when submitted."}
            </p>
          </div>
        ) : (
          visibleReviews.map((review) => (
            <article className="admin-review-card" key={review.id}>
              <div className="admin-review-top">
                <div>
                  <h2>{review.name}</h2>
                  <p className="admin-muted">{review.project}</p>
                </div>

                <span
                  className={
                    review.approved
                      ? "admin-status published"
                      : "admin-status pending"
                  }
                >
                  {review.approved ? "Published" : "Pending"}
                </span>
              </div>

              <div
                className="admin-stars"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {"★".repeat(Math.max(0, Math.min(5, review.rating)))}
                {"☆".repeat(5 - Math.max(0, Math.min(5, review.rating)))}
              </div>

              <p className="admin-review-message">{review.message}</p>

              {review.imageUrls?.length > 0 && (
                <div className="admin-review-images">
                  {review.imageUrls.map((url, index) => (
                    <button
                      type="button"
                      className="admin-review-image"
                      key={`${review.id}-${url}`}
                      aria-label={`View photo ${index + 1} submitted by ${review.name}`}
                      onClick={() =>
                        openImagePreview(
                          review.imageUrls,
                          index,
                          review.name,
                        )
                      }
                    >
                      <img
                        src={url}
                        alt={`Photo ${index + 1} submitted by ${review.name}`}
                        loading="lazy"
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="admin-review-footer">
                <time dateTime={review.createdAt}>
                  {new Date(review.createdAt).toLocaleString()}
                </time>

                <button
                  type="button"
                  className={
                    review.approved
                      ? "admin-button admin-button-light"
                      : "admin-button"
                  }
                  disabled={busyId === review.id}
                  onClick={() => void updateReview(review)}
                >
                  {busyId === review.id
                    ? "Saving..."
                    : review.approved
                      ? "Hide review"
                      : "Approve review"}
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      {imagePreview && (
        <div
          className="image-preview-overlay"
          onClick={() => setImagePreview(null)}
          role="presentation"
        >
          <div
            className="image-preview-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Review photo preview"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="image-preview-close"
              onClick={() => setImagePreview(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>

            <button
              type="button"
              className="image-preview-nav image-preview-prev"
              onClick={showPreviousImage}
              aria-label="Previous image"
              disabled={imagePreview.images.length < 2}
            >
              &#10094;
            </button>

            <img
              className="image-preview-full"
              src={imagePreview.images[imagePreview.index]}
              alt={`Photo ${imagePreview.index + 1} submitted by ${imagePreview.name}`}
            />

            <button
              type="button"
              className="image-preview-nav image-preview-next"
              onClick={showNextImage}
              aria-label="Next image"
              disabled={imagePreview.images.length < 2}
            >
              &#10095;
            </button>

            <div className="image-preview-caption">
              {imagePreview.name} · {imagePreview.index + 1} of{" "}
              {imagePreview.images.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
