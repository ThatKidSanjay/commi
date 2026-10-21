
"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import "./admin.css";

type OrderStatus = "PENDING" | "APPROVED" | "REJECTED";
type Filter = "ALL" | OrderStatus;

type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  packageId: string;
  packageName: string;
  amountPesos: number | string;
  templateId: string;
  templateName: string;
  templateCategory: string;
  paymentMethod: string;
  websiteData?: Record<string, unknown>;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
};

type OrderDetails = Order & {
  receiptDataUrl?: string;
};

type ApiResponse = {
  orders?: Order[];
  order?: OrderDetails;
  error?: string;
  success?: boolean;
};

const filters: { label: string; value: Filter }[] = [
  { label: "All orders", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

function formatPrice(amount: number | string) {
  const value = Number(amount);

  return Number.isFinite(value)
    ? value.toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP",
        maximumFractionDigits: 2,
      })
    : "₱0.00";
}

function formatDate(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : date.toLocaleString("en-PH", {
        dateStyle: "medium",
        timeStyle: "short",
      });
}

function errorMessage(data: ApiResponse, fallback: string) {
  return data.error || fallback;
}

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<Filter>("PENDING");
  const [search, setSearch] = useState("");
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [busyId, setBusyId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const loadOrders = useCallback(async () => {
    setLoadingOrders(true);
    setError("");

    try {
      const response = await fetch("/api/admin/orders", {
        method: "GET",
        cache: "no-store",
        credentials: "same-origin",
      });

      const data: ApiResponse = await response.json();

      if (response.status === 401) {
        setAuthenticated(false);
        setOrders([]);
        return;
      }

      if (!response.ok) {
        throw new Error(errorMessage(data, "Unable to load orders."));
      }

      setOrders(data.orders ?? []);
      setAuthenticated(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load orders.",
      );
    } finally {
      setLoadingOrders(false);
      setCheckingSession(false);
    }
  }, []);

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setCheckingSession(true);

    try {
      const response = await fetch("/api/reviews/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(errorMessage(data, "Unable to sign in."));
      }

      setPassword("");
      await loadOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setCheckingSession(false);
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
        throw new Error(errorMessage(data, "Unable to sign out."));
      }

      setAuthenticated(false);
      setOrders([]);
      setSelectedOrder(null);
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign out.");
    } finally {
      setLoggingOut(false);
    }
  }

  async function openOrder(order: Order) {
    setSelectedOrder(null);
    setLoadingDetails(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/orders/${encodeURIComponent(order.id)}`,
        {
          method: "GET",
          cache: "no-store",
          credentials: "same-origin",
        },
      );

      const data: ApiResponse = await response.json();

      if (response.status === 401) {
        setAuthenticated(false);
        setOrders([]);
        throw new Error("Your admin session expired. Please sign in again.");
      }

      if (!response.ok || !data.order) {
        throw new Error(errorMessage(data, "Unable to load order details."));
      }

      setSelectedOrder(data.order);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load order details.",
      );
    } finally {
      setLoadingDetails(false);
    }
  }

  async function updateOrder(order: OrderDetails, status: OrderStatus) {
    if (status === "PENDING") return;

    const action = status === "APPROVED" ? "approve" : "reject";

    if (
      !window.confirm(
        `Are you sure you want to ${action} this order from ${order.customerName}?`,
      )
    ) {
      return;
    }

    setBusyId(order.id);
    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `/api/admin/orders/${encodeURIComponent(order.id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ status }),
        },
      );

      const data: ApiResponse = await response.json();

      if (response.status === 401) {
        setAuthenticated(false);
        setOrders([]);
        setSelectedOrder(null);
        throw new Error("Your admin session expired. Please sign in again.");
      }

      if (!response.ok) {
        throw new Error(errorMessage(data, "Unable to update this order."));
      }

      setOrders((current) =>
        current.map((item) =>
          item.id === order.id ? { ...item, status } : item,
        ),
      );

      setSelectedOrder((current) =>
        current?.id === order.id ? { ...current, status } : current,
      );

      setNotice(
        `Order ${order.id.slice(0, 8)} has been ${status.toLowerCase()}.`,
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update order.",
      );
    } finally {
      setBusyId("");
    }
  }

  const pendingCount = orders.filter(
    (order) => order.status === "PENDING",
  ).length;

  const approvedCount = orders.filter(
    (order) => order.status === "APPROVED",
  ).length;

  const rejectedCount = orders.filter(
    (order) => order.status === "REJECTED",
  ).length;

  const totalValue = orders
    .filter((order) => order.status === "APPROVED")
    .reduce((sum, order) => sum + Number(order.amountPesos || 0), 0);

  const visibleOrders = orders.filter((order) => {
    const matchesFilter = filter === "ALL" || order.status === filter;
    const query = search.trim().toLowerCase();

    const matchesSearch =
      !query ||
      [
        order.customerName,
        order.customerEmail,
        order.customerPhone,
        order.packageName,
        order.templateName,
        order.id,
      ].some((value) => value?.toLowerCase().includes(query));

    return matchesFilter && matchesSearch;
  });

  if (checkingSession && !authenticated) {
    return (
      <main className="lh-admin">
        <section className="lh-admin-login">
          <span className="lh-admin-kicker">LHIMF / ADMINISTRATION</span>
          <h1>Admin dashboard</h1>
          <p>Checking your admin session…</p>
        </section>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="lh-admin">
        <section className="lh-admin-login">
          <Link href="/" className="lh-admin-brand">
            LHIMF<span>.</span>
          </Link>
          <span className="lh-admin-kicker">ADMINISTRATION</span>
          <h1>Welcome back.</h1>
          <p className="lh-admin-subtitle">
            Sign in to manage website orders, payment receipts, and customer
            reviews.
          </p>

          <form className="lh-admin-login-form" onSubmit={login}>
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
            <button type="submit" disabled={checkingSession}>
              {checkingSession ? "Signing in…" : "Sign in to dashboard"}
            </button>
          </form>

          {error && <p className="lh-admin-error" role="alert">{error}</p>}
          <Link className="lh-admin-back" href="/">
            ← Back to website
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="lh-admin">
      <div className="lh-admin-shell">
        <aside className="lh-admin-sidebar">
          <Link href="/" className="lh-admin-brand">
            LHIMF<span>.</span>
          </Link>
          <p className="lh-admin-sidebar-label">WORKSPACE</p>

          <nav className="lh-admin-nav" aria-label="Admin navigation">
            <a className="lh-admin-nav-link active" href="#orders">
              <span aria-hidden="true">▦</span> Orders & payments
            </a>
            <Link className="lh-admin-nav-link" href="/admin/reviews">
              <span aria-hidden="true">☆</span> Customer reviews
            </Link>
            <Link className="lh-admin-nav-link" href="/">
              <span aria-hidden="true">↗</span> View website
            </Link>
          </nav>

          <div className="lh-admin-sidebar-bottom">
            <span className="lh-admin-session-dot" />
            <div>
              <strong>Admin session active</strong>
              <span>Secure workspace</span>
            </div>
          </div>
        </aside>

        <section className="lh-admin-main" id="orders">
          <header className="lh-admin-topbar">
            <div>
              <span className="lh-admin-kicker">LHIMF / WORKSPACE</span>
              <h1>Orders & payments</h1>
              <p>Review orders and verify payment receipts before approval.</p>
            </div>
            <button
              type="button"
              className="lh-admin-logout"
              onClick={() => void logout()}
              disabled={loggingOut}
            >
              {loggingOut ? "Signing out…" : "Sign out"}
            </button>
          </header>

          {error && <div className="lh-admin-alert error" role="alert">{error}</div>}
          {notice && <div className="lh-admin-alert success" role="status">{notice}</div>}

          <section className="lh-admin-stats" aria-label="Order statistics">
            <article className="lh-admin-stat">
              <span>Total orders</span>
              <strong>{orders.length}</strong>
              <small>Orders received</small>
            </article>
            <article className="lh-admin-stat">
              <span>Pending review</span>
              <strong>{pendingCount}</strong>
              <small>Require your attention</small>
            </article>
            <article className="lh-admin-stat">
              <span>Approved</span>
              <strong>{approvedCount}</strong>
              <small>Approved orders</small>
            </article>
            <article className="lh-admin-stat">
              <span>Approved value</span>
              <strong>{formatPrice(totalValue)}</strong>
              <small>{rejectedCount} rejected</small>
            </article>
          </section>

          <section className="lh-admin-orders-panel">
            <div className="lh-admin-panel-heading">
              <div>
                <h2>Order management</h2>
                <p>Open an order to view the customer's information and receipt.</p>
              </div>
              <button
                type="button"
                className="lh-admin-refresh"
                onClick={() => void loadOrders()}
                disabled={loadingOrders}
              >
                {loadingOrders ? "Refreshing…" : "↻ Refresh"}
              </button>
            </div>

            <div className="lh-admin-toolbar">
              <div className="lh-admin-filters" aria-label="Filter orders">
                {filters.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={filter === item.value ? "selected" : ""}
                    aria-pressed={filter === item.value}
                    onClick={() => setFilter(item.value)}
                  >
                    {item.label}
                    {item.value === "PENDING" && pendingCount > 0
                      ? ` (${pendingCount})`
                      : ""}
                  </button>
                ))}
              </div>

              <input
                className="lh-admin-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search customer or order…"
                aria-label="Search orders"
              />
            </div>

            {loadingOrders ? (
              <div className="lh-admin-empty">
                <span className="lh-admin-spinner" />
                <p>Loading orders…</p>
              </div>
            ) : visibleOrders.length === 0 ? (
              <div className="lh-admin-empty">
                <span className="lh-admin-empty-icon">▤</span>
                <h3>No orders found</h3>
                <p>
                  {search
                    ? "Try a different search term."
                    : filter === "PENDING"
                      ? "You're all caught up. No orders are waiting for approval."
                      : "Orders matching this filter will appear here."}
                </p>
              </div>
            ) : (
              <div className="lh-admin-table-wrap">
                <table className="lh-admin-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Package / template</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th><span className="sr-only">Action</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleOrders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <strong className="lh-admin-customer">{order.customerName}</strong>
                          <span className="lh-admin-secondary">{order.customerEmail}</span>
                          <span className="lh-admin-order-id">#{order.id.slice(0, 8)}</span>
                        </td>
                        <td>
                          <strong>{order.packageName}</strong>
                          <span className="lh-admin-secondary">{order.templateName}</span>
                        </td>
                        <td className="lh-admin-amount">{formatPrice(order.amountPesos)}</td>
                        <td>{order.paymentMethod}</td>
                        <td>
                          <span className={`lh-admin-status ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="lh-admin-date">{formatDate(order.createdAt)}</td>
                        <td>
                          <button
                            type="button"
                            className="lh-admin-view"
                            onClick={() => void openOrder(order)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <footer className="lh-admin-panel-footer">
              <span>
                Showing {visibleOrders.length} of {orders.length} loaded orders
              </span>
              <span>Maximum 100 recent orders</span>
            </footer>
          </section>

          <footer className="lh-admin-page-footer">
            <span>LHIMF Admin Workspace</span>
            <span>Review payment receipts manually before approving.</span>
          </footer>
        </section>
      </div>

      {(loadingDetails || selectedOrder) && (
        <div
          className="lh-admin-modal-backdrop"
          role="presentation"
          onClick={() => {
            if (!loadingDetails) setSelectedOrder(null);
          }}
        >
          <section
            className="lh-admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lh-order-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            {loadingDetails ? (
              <div className="lh-admin-empty">
                <span className="lh-admin-spinner" />
                <p>Loading order details…</p>
              </div>
            ) : selectedOrder ? (
              <>
                <header className="lh-admin-modal-header">
                  <div>
                    <span className="lh-admin-kicker">
                      ORDER #{selectedOrder.id.slice(0, 8)}
                    </span>
                    <h2 id="lh-order-detail-title">Order details</h2>
                  </div>
                  <button
                    type="button"
                    className="lh-admin-modal-close"
                    onClick={() => setSelectedOrder(null)}
                    aria-label="Close order details"
                  >
                    ×
                  </button>
                </header>

                <div className="lh-admin-modal-body">
                  <div className="lh-admin-detail-status">
                    <span className={`lh-admin-status ${selectedOrder.status.toLowerCase()}`}>
                      {selectedOrder.status}
                    </span>
                    <span>{formatDate(selectedOrder.createdAt)}</span>
                  </div>

                  <section className="lh-admin-detail-section">
                    <h3>Customer information</h3>
                    <dl className="lh-admin-detail-grid">
                      <div><dt>Full name</dt><dd>{selectedOrder.customerName}</dd></div>
                      <div><dt>Email</dt><dd>{selectedOrder.customerEmail}</dd></div>
                      <div><dt>Phone</dt><dd>{selectedOrder.customerPhone}</dd></div>
                      <div><dt>Address</dt><dd>{selectedOrder.customerAddress}</dd></div>
                    </dl>
                  </section>

                  <section className="lh-admin-detail-section">
                    <h3>Order summary</h3>
                    <dl className="lh-admin-detail-grid">
                      <div><dt>Package</dt><dd>{selectedOrder.packageName}</dd></div>
                      <div><dt>Template</dt><dd>{selectedOrder.templateName}</dd></div>
                      <div><dt>Category</dt><dd>{selectedOrder.templateCategory}</dd></div>
                      <div><dt>Payment method</dt><dd>{selectedOrder.paymentMethod}</dd></div>
                    </dl>
                    <div className="lh-admin-total">
                      <span>Order total</span>
                      <strong>{formatPrice(selectedOrder.amountPesos)}</strong>
                    </div>
                  </section>

                  <section className="lh-admin-detail-section">
                    <h3>Payment receipt</h3>
                    {selectedOrder.receiptDataUrl ? (
                      <a
                        className="lh-admin-receipt-link"
                        href={selectedOrder.receiptDataUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="lh-admin-receipt"
                          src={selectedOrder.receiptDataUrl}
                          alt={`Payment receipt for order ${selectedOrder.id.slice(0, 8)}`}
                        />
                        <span>Open receipt in a new tab ↗</span>
                      </a>
                    ) : (
                      <p className="lh-admin-no-receipt">
                        No receipt was attached to this order.
                      </p>
                    )}
                    <p className="lh-admin-receipt-note">
                      Check the amount, payment destination, transaction details,
                      and payment status through your payment provider before
                      approving this order.
                    </p>
                  </section>

                  {selectedOrder.websiteData &&
                    Object.keys(selectedOrder.websiteData).length > 0 && (
                      <details className="lh-admin-website-data">
                        <summary>Submitted website information</summary>
                        <dl className="lh-admin-detail-grid">
                          {Object.entries(selectedOrder.websiteData).map(([key, value]) => (
                            <div key={key}>
                              <dt>{key.replace(/([A-Z])/g, " $1")}</dt>
                              <dd>
                                {typeof value === "string" || typeof value === "number"
                                  ? String(value)
                                  : value === null
                                    ? "—"
                                    : "[Provided]"}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </details>
                    )}
                </div>

                <footer className="lh-admin-modal-footer">
                  <button
                    type="button"
                    className="lh-admin-secondary-button"
                    onClick={() => setSelectedOrder(null)}
                  >
                    Close
                  </button>

                  {selectedOrder.status === "PENDING" && (
                    <>
                      <button
                        type="button"
                        className="lh-admin-reject-button"
                        disabled={busyId === selectedOrder.id}
                        onClick={() => void updateOrder(selectedOrder, "REJECTED")}
                      >
                        {busyId === selectedOrder.id ? "Saving…" : "Reject"}
                      </button>
                      <button
                        type="button"
                        className="lh-admin-approve-button"
                        disabled={busyId === selectedOrder.id}
                        onClick={() => void updateOrder(selectedOrder, "APPROVED")}
                      >
                        {busyId === selectedOrder.id ? "Saving…" : "Approve payment"}
                      </button>
                    </>
                  )}
                </footer>
              </>
            ) : null}
          </section>
        </div>
      )}
    </main>
  );
}
