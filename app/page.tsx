import { auth, signIn, signOut } from "../auth";
import { getDb } from "../lib/db";
import styles from "./page.module.css";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();
  const db = await getDb();
  const allUsers = await db.user.findMany();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Next.js + Cloudflare</h1>
          <p className={styles.subtitle}>D1 Database + GitHub Authentication</p>
        </div>

        <div className={styles.authCard}>
          {session?.user ? (
            <div className={styles.authContent}>
              <div className={styles.userInfo}>
                {session.user.image ? (
                  <img src={session.user.image} alt="Avatar" className={styles.avatar} />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.avatarIcon}>
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
                <div className={styles.userDetails}>
                  <p className={styles.welcomeText}>Welcome back!</p>
                  <p className={styles.userName}>{session.user.name || "User"}</p>
                </div>
              </div>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirect: false });
                  redirect("/");
                }}
              >
                <button type="submit" className={styles.button}>
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <div className={styles.authContent}>
              <div className={styles.notAuthContent}>
                <svg
                  className={styles.lockIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <p className={styles.notAuthText}>Sign in to access your account</p>
              </div>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button type="submit" className={styles.buttonPrimary}>
                  <svg className={styles.githubIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  Sign in with GitHub
                </button>
              </form>
            </div>
          )}
        </div>

        <div className={styles.usersSection}>
          <h2 className={styles.sectionTitle}>Database Users</h2>
          <div className={styles.usersList}>
            {allUsers.length > 0 ? (
              allUsers.map((user) => (
                <div key={user.id} className={styles.userCard}>
                  <div className={styles.userCardContent}>
                    <p className={styles.userCardName} data-testid={`name-${user.name}`}>
                      {user.name || "Anonymous"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.emptyState}>No users found in database</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
