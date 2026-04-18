FROM node:alpine3.18 AS build

# Build the Next.js app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ARG NEXT_PUBLIC_RAZORPAY_KEY_ID
ENV NEXT_PUBLIC_RAZORPAY_KEY_ID=$NEXT_PUBLIC_RAZORPAY_KEY_ID

RUN npm run build

# Run the Next.js server
FROM node:alpine3.18 AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy standalone output and static assets
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]