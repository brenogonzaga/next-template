# Deployment Information

## Production URL

🚀 **https://api.gonzaga.workers.dev**

## Deployment Status

✅ Successfully deployed to Cloudflare Workers

## Environment Variables Configured

- ✅ `AUTH_SECRET` - Set in Cloudflare
- ✅ `AUTH_GITHUB_ID` - Set in Cloudflare
- ✅ `AUTH_GITHUB_SECRET` - Set in Cloudflare
- ✅ `NEXTAUTH_URL` - Set in Cloudflare
- ✅ `AUTH_TRUST_HOST` - Set in Cloudflare

## Database

- ✅ D1 Database populated with schema
- ✅ Production database ID: `f5188e4a-da45-45e4-95e9-01b09fdbc2e0`

## GitHub OAuth Configuration

**⚠️ IMPORTANT: Update GitHub OAuth App Settings**

Go to: https://github.com/settings/developers

Update your "NEXT TEMPLATE" OAuth App:

**For Production (Recommended):**

- **Homepage URL:** `https://api.gonzaga.workers.dev`
- **Authorization callback URL:** `https://api.gonzaga.workers.dev/api/auth/callback/github`

**For Local Development:**

Create a separate OAuth App or temporarily switch URLs:

- **Homepage URL:** `http://localhost:8787`
- **Authorization callback URL:** `http://localhost:8787/api/auth/callback/github`

**Note:** GitHub OAuth Apps support only ONE callback URL at a time. For both environments, create two separate OAuth Apps or switch the URL when needed.

## Next Steps

1. Update GitHub OAuth URLs (see above)
2. Test production: https://api.gonzaga.workers.dev
3. Sign in with GitHub and verify authentication works
4. Commit changes with: `git commit -m "feat: add GitHub OAuth authentication with Cloudflare D1"`

## Useful Commands

```bash
# Deploy to production
npm run build:worker
npx wrangler deploy

# View production logs
npx wrangler tail

# Execute SQL on production D1
npx wrangler d1 execute next-template --command="SELECT * FROM User" --remote

# Set/update environment variables
echo "value" | npx wrangler secret put VARIABLE_NAME

# List all secrets
npx wrangler secret list

# Local development
npm run preview:worker

# View logs in real-time
npx wrangler tail
```

## Production URLs

- 🌐 **Application:** https://api.gonzaga.workers.dev
- 📊 **Cloudflare Dashboard:** https://dash.cloudflare.com

## Stack

- Next.js 15.5.9
- Cloudflare Workers
- Cloudflare D1 (SQLite)
- Prisma 7.2.0 with D1 adapter
- NextAuth.js 5.0 with GitHub provider
