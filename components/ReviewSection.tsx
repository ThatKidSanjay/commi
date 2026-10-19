
"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

type Review = {
  id: string;
  name: string;
  project: string;
  rating: number;
  message: string;
  imageUrls: string[];
  createdAt: string;
};

type ApiResponse = {
  reviews?: Review[];
  urls?: string[];
  error?: string;
  message?: string;
};

type ImagePreview = {
  images: string[];
  index: number;
  name: string;
};

const MAX_IMAGES = 3;
const MAX_FILE_SIZE = 4 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const PROJECT_TYPES = [
  "Business Website",
  "Portfolio Website",
  "Event / Invitation Website",
  "Community / Organization Website",
  "Corporate / Internal System",
  "Other / Custom Project",
];

async function readJson(
  response: Response,
): Promise<ApiResponse> {
  try {
    return (await response.json()) as ApiResponse;
  } catch {
    return {};
  }
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [project, setProject] = useState(PROJECT_TYPES[0]);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [imagePreview, setImagePreview] =
    useState<ImagePreview | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState<
    "success" | "error" | ""
  >("");

  // Load approved reviews.
  useEffect(() => {
    let active = true;

    async function loadReviews() {
      try {
        const response = await fetch("/api/reviews", {
          cache: "no-store",
        });

        const data = await readJson(response);

        if (!response.ok) {
          throw new Error(
            data.error || "Unable to load reviews.",
          );
        }

        if (active) {
          setReviews(
            Array.isArray(data.reviews) ? data.reviews : [],
          );
        }
      } catch {
        if (active) {
          setNotice(
            "Unable to load reviews. Please refresh the page.",
          );
          setNoticeType("error");
        }
      } finally {
        if (active) {
          setLoaded(true);
        }
      }
    }

    void loadReviews();

    return () => {
      active = false;
    };
  }, []);

  // Create and clean up temporary upload-preview URLs.
  useEffect(() => {
    const urls = selectedFiles.map((file) =>
      URL.createObjectURL(file),
    );

    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  // Match the admin image viewer's keyboard controls.
  useEffect(() => {
    if (!imagePreview) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setImagePreview(null);
      }

      if (event.key === "ArrowLeft") {
        setImagePreview((current) => {
          if (!current || current.images.length < 2) {
            return current;
          }

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
          if (!current || current.images.length < 2) {
            return current;
          }

          return {
            ...current,
            index:
              (current.index + 1) % current.images.length,
          };
        });
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [imagePreview]);

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(event.target.files ?? []);

    // Allow selecting the same file again after removing it.
    event.target.value = "";

    if (files.length === 0) return;

    setNotice("");
    setNoticeType("");

    if (selectedFiles.length + files.length > MAX_IMAGES) {
      setNotice("You can attach a maximum of 3 images.");
      setNoticeType("error");
      return;
    }

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setNotice(
          "Only JPEG, PNG, and WebP images are allowed.",
        );
        setNoticeType("error");
        return;
      }

      if (file.size === 0 || file.size > MAX_FILE_SIZE) {
        setNotice(
          "Each image must be larger than 0 bytes and no larger than 4 MB.",
        );
        setNoticeType("error");
        return;
      }
    }

    setSelectedFiles((current) => [...current, ...files]);
  }

  function removeImage(index: number) {
    setSelectedFiles((current) =>
      current.filter((_, i) => i !== index),
    );
  }

  // Open the full-screen viewer without navigating to the image URL.
  function openImagePreview(
    images: string[],
    index: number,
    reviewName: string,
  ) {
    if (images.length === 0) return;

    setImagePreview({
      images,
      index,
      name: reviewName,
    });
  }

  function showPreviousImage() {
    setImagePreview((current) => {
      if (!current || current.images.length < 2) {
        return current;
      }

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
      if (!current || current.images.length < 2) {
        return current;
      }

      return {
        ...current,
        index: (current.index + 1) % current.images.length,
      };
    });
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (submitting) return;

    setNotice("");
    setNoticeType("");

    const cleanName = name.trim();
    const cleanMessage = message.trim();

    if (cleanName.length < 2 || cleanName.length > 60) {
      setNotice(
        "Your name must be between 2 and 60 characters.",
      );
      setNoticeType("error");
      return;
    }

    if (
      cleanMessage.length < 5 ||
      cleanMessage.length > 1000
    ) {
      setNotice(
        "Your review must be between 5 and 1,000 characters.",
      );
      setNoticeType("error");
      return;
    }

    setSubmitting(true);

    try {
      let imageUrls: string[] = [];

      // Step 1: Upload selected photos to Vercel Blob.
      if (selectedFiles.length > 0) {
        const formData = new FormData();

        selectedFiles.forEach((file) => {
          formData.append("file", file);
        });

        const uploadResponse = await fetch(
          "/api/reviews/upload",
          {
            method: "POST",
            body: formData,
          },
        );

        const uploadData = await readJson(uploadResponse);

        if (!uploadResponse.ok) {
          throw new Error(
            uploadData.error ||
              "Unable to upload your images.",
          );
        }

        if (
          !Array.isArray(uploadData.urls) ||
          uploadData.urls.length !== selectedFiles.length ||
          !uploadData.urls.every(
            (url) => typeof url === "string",
          )
        ) {
          throw new Error(
            "The image upload returned an invalid response.",
          );
        }

        imageUrls = uploadData.urls;
      }

      // Step 2: Save the review and uploaded image URLs.
      const reviewResponse = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
          project,
          rating,
          message: cleanMessage,
          imageUrls,
        }),
      });

      const reviewData = await readJson(reviewResponse);

      if (!reviewResponse.ok) {
        throw new Error(
          reviewData.error || "Unable to submit your review.",
        );
      }

      // Pending reviews remain hidden until approved.
      setName("");
      setProject(PROJECT_TYPES[0]);
      setRating(5);
      setMessage("");
      setSelectedFiles([]);

      setNotice(
        reviewData.message ||
          "Thank you! Your review has been submitted for approval.",
      );
      setNoticeType("success");
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
      setNoticeType("error");
    } finally {
      setSubmitting(false);
    }
  }

  const average =
    reviews.length > 0
      ? reviews.reduce(
          (sum, review) => sum + review.rating,
          0,
        ) / reviews.length
      : 0;

  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-wrap">
        <div className="reviews-heading">
          <p className="reviews-label">
            01 / CLIENT FEEDBACK
          </p>

          <h2>
            Real experiences.
            <br />
            <span>Honest feedback.</span>
          </h2>

          <p className="reviews-intro">
            Have worked with LHIMF? Share your experience and
            help others discover what we can build together.
          </p>
        </div>

        <div className="reviews-summary">
          <div className="reviews-average">
            <strong>
              {reviews.length ? average.toFixed(1) : "—"}
            </strong>

            <span
              className="reviews-stars"
              aria-label={`${average.toFixed(1)} out of 5 stars`}
            >
              {"★".repeat(Math.round(average))}
              {"☆".repeat(5 - Math.round(average))}
            </span>

            <span>
              {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </span>
          </div>

          <p>
            Feedback matters. Every review helps improve the
            experience, one project at a time.
          </p>
        </div>

        <div className="reviews-layout">
          <div className="reviews-list">
            <div className="reviews-list-heading">
              <h3>Client reviews</h3>
              <span>{reviews.length} approved</span>
            </div>

            {!loaded ? (
              <p className="reviews-empty">
                Loading reviews...
              </p>
            ) : reviews.length === 0 ? (
              <div className="reviews-empty">
                <span className="reviews-empty-icon">☆</span>
                <h4>Be the first to leave a review.</h4>
                <p>
                  Your feedback can help others feel confident
                  about starting their project with LHIMF.
                </p>
              </div>
            ) : (
              <div className="reviews-items">
                {reviews.map((review) => {
                  const imageUrls = Array.isArray(
                    review.imageUrls,
                  )
                    ? review.imageUrls
                    : [];

                  return (
                    <article
                      className="review-card"
                      key={review.id}
                    >
                      <div className="review-card-top">
                        <div
                          className="review-avatar"
                          aria-hidden="true"
                        >
                          {review.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="review-author">
                          <strong>{review.name}</strong>
                          <span>{review.project}</span>
                        </div>

                        <time dateTime={review.createdAt}>
                          {new Date(
                            review.createdAt,
                          ).toLocaleDateString()}
                        </time>
                      </div>

                      <div
                        className="review-rating"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>

                      <p className="review-message">
                        {review.message}
                      </p>

                      {/* Thumbnails use buttons, never image links. */}
                      {imageUrls.length > 0 && (
                        <div className="review-gallery">
                          <div className="review-gallery-images">
                            {imageUrls.map((url, index) => (
                              <button
                                type="button"
                                className="review-gallery-thumbnail"
                                key={`${review.id}-${url}`}
                                onClick={() =>
                                  openImagePreview(
                                    imageUrls,
                                    index,
                                    review.name,
                                  )
                                }
                                aria-label={`View photo ${index + 1} of ${imageUrls.length} from ${review.name}'s review`}
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
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          <aside className="review-form-card">
            <p className="reviews-label">
              SHARE YOUR EXPERIENCE
            </p>

            <h3>Add a review</h3>

            <p className="review-form-description">
              Tell us how your project experience went.
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="review-name">
                Your name
              </label>

              <input
                id="review-name"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                minLength={2}
                maxLength={60}
                required
              />

              <label htmlFor="review-project">
                Project type
              </label>

              <select
                id="review-project"
                value={project}
                onChange={(event) =>
                  setProject(event.target.value)
                }
              >
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <label htmlFor="review-rating">
                How would you rate your experience?
              </label>

              <div
                className="review-star-picker"
                id="review-rating"
                role="group"
                aria-label="Choose a star rating"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={star <= rating ? "selected" : ""}
                    onClick={() => setRating(star)}
                    aria-label={`${star} star${star === 1 ? "" : "s"}`}
                    aria-pressed={rating === star}
                  >
                    ★
                  </button>
                ))}

                <span>{rating}/5</span>
              </div>

              <label htmlFor="review-message">
                Your review
              </label>

              <textarea
                id="review-message"
                placeholder="Tell us about your experience..."
                rows={5}
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                minLength={5}
                maxLength={1000}
                required
              />

              <div className="review-character-count">
                {message.length}/1000
              </div>

              <label htmlFor="review-images">
                Add photos (optional)
              </label>

              <input
                id="review-images"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleFileChange}
                disabled={
                  submitting ||
                  selectedFiles.length >= MAX_IMAGES
                }
              />

              <p className="review-form-description">
                Up to 3 photos. JPEG, PNG, or WebP.
                Maximum 4 MB each.
              </p>

              {previews.length > 0 && (
                <div className="review-image-previews">
                  {previews.map((url, index) => (
                    <div
                      className="review-image-preview"
                      key={url}
                    >
                      <img
                        src={url}
                        alt={`Selected image ${index + 1}`}
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        disabled={submitting}
                        aria-label={`Remove image ${index + 1}`}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                className="review-submit"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Review"}

                <span>{submitting ? "…" : "↗"}</span>
              </button>

              {notice && (
                <p
                  className={`review-notice ${noticeType}`}
                  role="status"
                  aria-live="polite"
                >
                  {notice}
                </p>
              )}

              <p className="review-privacy-note">
                Reviews are checked before appearing publicly.
                Please only share photos you have permission to post.
              </p>
            </form>
          </aside>
        </div>
      </div>

      {/* Full-screen image viewer — same behavior as admin */}
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
              draggable={false}
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
    </section>
  );
}
