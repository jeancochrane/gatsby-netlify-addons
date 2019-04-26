# Gatsby JAMStack notes

- Tutorial for setting up login, product reviews, and Slack notifications using
  Identity, Forms, and Functions:
  https://css-tricks.com/forms-auth-and-serverless-functions-on-gatsby-and-netlify/

- Guide to integrating Gatsby, Identity, and Functions:
  https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/

- In Gatsby, restricted views are implemented as ["client
  paths"](https://www.gatsbyjs.org/packages/gatsby-plugin-create-client-paths/):
  views that are rendered on the client side only and are not prebuilt
    - This means that restricted views need to be implemented as React apps, with
      their own routing

- Nothing on the client side is safe; because of this, any sensitive data needs to
  be retrieved over authenticated API
    - Identity and Functions integrate nicely here: If you send along a JSON
      Web Token in the `Authorization` header to a Netlify Function, the
      Function will decode the `user` claim for you
        - This maybe doesn't work in local development? Need to investigate
          Netlify Dev on this point.

## Identity ([full docs](https://www.netlify.com/docs/identity/))

- There seem to be two options for **authentication UI**: Either use the
  `netlify-identity-widget` JavaScript module (opinionated; provides login/logout
  buttons and modal by) or wire up a custom solution with `gotrue-js` (lower-level
  auth API)

- **Registration** is open by default. You can make registration invite-only, but
  the free tier currently only supports 5 users.

- **External identity providers** are supported, meaning the user can create an
  account with the following external providers:
    - Google
    - GitHub
    - GitLab
    - BitBucket

- How are **roles** configured? The screenshots make this look like it's possible.

- **Pricing** isn't great for sites that require many admin users. The free tier
  only includes 5 invite-only users, and the next-smallest tier is $100/mo. Still,
  for many of our Django sites, we only have one or two admin users anyway.
    - Free tier:
        - 1,000 active users
        - 5 invite-only users
    - Pro tier ($99/mo/site)
        - 5,000 active users
        - 100 invite-only users


## Forms ([full docs](https://www.netlify.com/docs/form-handling/))

- The form is identified by a `name` attribute, which tells Netlify what
  to call it in the web interface. Probably **not friendly for formsets**?

- Built-in **spam filtering** with Akismet. Options for adding additional
  honeypot fields, as well as reCAPTCHA 2 integration.

- **Pricing** is only free if you have less than 100 submissions per month. The
  second tier is reasonable at $20/mo, but might not scale to an app that has a
  lot of form submissions.
    - Free tier:
        - 100 submissions/mo
    - Level 1 ($19/mo/site):
        - 1,000 submissions/mo
    - Further packs:
        - $9/500 extra submissions/mo

## Functions ([full docs](https://www.netlify.com/docs/functions))

- **Languages** currently supported include JavaScript (Node.js) and Go. No mention
  of plans for Python support yet.

- **Pricing** is pretty reasonable, scales with usage.
    - Free tier:
        - 125k requests/mo
        - 100 hours of function runtime/mo
    - Pro tier ($25/mo/site):
        - 2 million requests/mo
        - 1,000 hours of function runtime/mo

- **Event triggered functions** allow you to hook into Netlify events. These
  functions have to be named after the corresponding event, so that Netlify knows
  when to run them. Some interesting ones include:
    - Deploy success/failure
    - Form submission
    - Identity signup/login

- **Integration with Identity** means that Functions get access to user claims
  for logged-in users by default. This lets you run the equivalent of "server-side"
  code for logged-in users.
    - See: https://www.netlify.com/docs/functions/#identity-and-functions

- **Important limitations**:
    - 128MB/10 second execution limit
