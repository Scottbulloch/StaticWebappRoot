---
custom_edit_url: null
sidebar_position: 2
---

# API authentication

Snow Atlas authentication is governed by the Snow Atlas Identity Provider (IDP). Snow Atlas APIs are protected by access tokens issued by the IDP.

Snow Atlas currently supports OAuth2 and OpenID Connect (OIDC).

## OpenID Connect discovery

OIDC clients can query the well known configuration endpoint at any time to determine the level of interoperability. Available at: `https://{region}.snowsoftware.io/idp/.well-known/openid-configuration`

:::note

You can find your **Data region** in the **Snow Atlas settings** menu, in **Licenses and usage**. Your **Data region** is on the **General information** tab. For further information, see [General information](https://docs.snowsoftware.com/snow-atlas/en/UUID-2d4ce22b-e2a9-b7b0-44b8-0ecc55c2959f.html).

:::

## OpenID Connect response types

All endpoints derived from the OpenID Connect well known configuration endpoint returns errors formatted according to [https://openid.net/specs/openid-connect-core-1\_0.html#AuthError](https://openid.net/specs/openid-connect-core-1_0.html#AuthError).

Identity management APIs return a different set of response types that do not conform to the OIDC specification.

## Identity APIs

The identity APIs are hosted at `https://{region}.snowsoftware.io/idp/api`.

Product and core APIs are available at `https://{region}.snowsoftware.io/api`.

## Tokens

### Authorization request

The authorization request must be initiated against the regional issuer: `https://{region}.snowsoftware.io/idp`.

Multiplexing authorization requests against `https://apex.snowsoftware.io/idp` is not supported for third party or native clients.

The following optional parameters are supported on authorization requests.

|Name|Values|Description|
|---|---|---|
|max_age||The maximum age of the user session in seconds required to authorize the user. Combine with response validation of the identity token `auth_time` claim on the client on callback if used for authorization purposes.|
|prompt|`select_account`|Redirects the user to the login page allowing them to select a different domain|
|prompt|`none`|Does not prompt the user for interactive actions, and instead returns an error to the client if necessary|
|scope|`openid`|Uses OIDC and returns an identity token in the token response|
|scope|`offline_access`|Returns a refresh token in the token response|

### Token request

#### Resources

In addition to the OIDC `scope` parameter, the token can also be limited to individual APIs. You can use multiple values by defining the parameter multiple times. If no values are defined in the request, a default set of all available values are included.

|Values|Description|
|---|---|
|`api://snowsoftware.io/api`|Scopes the access token to product and core APIs|
|`api://snowsoftware.io/idp/api`|Scopes the access token to identity management APIs|

It is recommended that you explicitly specify the intended resources and exclude access to sensitive identity management APIs if not required.

### Token response

The token response contains the requested tokens formatted according to [https://openid.net/specs/openid-connect-core-1\_0.html#TokenResponse](https://openid.net/specs/openid-connect-core-1_0.html#TokenResponse).

As part of any token response, the `expires_in` property is made available in the response payload that defines the number of seconds until the access token expires.

### Access tokens

Access tokens are either returned as JSON Web Tokens (JWT) conforming to [RFC 7519 - JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519), or opaque reference tokens if configured as such.

:::note

Snow Software reserves the right to change the access token format or dialect at its discretion, including the type of access token issued for a specific client. Therefore, clients must always treat the access token as opaque regardless of the initial format returned.

:::

The access token is only valid for use against the Snow Atlas region it was issued from.

### Identity tokens

Identity tokens are returned as JWTs. Claims that are not part of the OIDC specification and are omitted from the table below are to be treated as internal. Claims that are defined as nullable may be omitted from the token if not set.

|Name|Description|Nullable|
|---|---|---|
|sub\*|The ID of the user|No|
|tenant|The ID of the tenant|No|
|tenant\_name|The name of the tenant|No|
|region|The data region|No|
|preferred\_username\*|The username|Yes|
|given\_name\*|The user's first name|Yes|
|family\_name\*|The user's last name|Yes|
|locale\*|Country code according to ISO3166‑1 in uppercase, separated by a dash, for example, en-US or fr-CA|Yes|
|zoneinfo\*|Time zone database value that represents the user's time zone|Yes|
|profile\*|A resource URI to the user's profile page|No|
|auth\_time\*\*|The time when the current session was established. Note that this is not the same as the time when the token was issued, which is defined by the claim `iat`.|No|
|picture\*|A resource URI to an external profile picture|Yes|
|iss\*\*|The URL to the issuer of this token|No|
|aud\*\*|Provides the client id for which this token is valid|No|
|azp\*\*|The authorizing party|No|
|exp\*\*|The expiration of the token|No|
|iat\*\*|The time when the token was issued|No|
  
  

\* Standard OIDC claims according to [https://openid.net/specs/openid-connect-core-1\_0.html#StandardClaims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)

\*\* ID Token claims according to [https://openid.net/specs/openid-connect-core-1\_0.html#IDToken](https://openid.net/specs/openid-connect-core-1_0.html#IDToken)

### Refresh tokens

You can use refresh tokens to request additional access tokens when these expire. Rolling refresh tokens are used which means a new refresh token is returned in every token response and the used refresh token is revoked.

### Making authenticated requests

Clients that have successfully acquired an access token can pass the access token in the Authorization header using Bearer Authentication:

`Authorization: Bearer <access_token>`

**Example**

```
curl -H "Authorization: Bearer <access_token>" https://{region}.snowsoftware.io/api
```

### Response management

It is recommended that clients manage the following status codes when making requests to Snow Atlas APIs:

|Response code|Response description|Recommended action|
|---|---|---|
|401|Unauthorized|Reauthenticate and retry once|
|403|Forbidden|Abort|
|429|Too Many Requests|The backoff time, if any, is indicated by the `Retry-After` response header in seconds. Abort for the duration specified by Retry-After, and retry.|

For more information, see [Client error responses (400 - 499)](../api-conventions.md#client-error-responses-400---499).