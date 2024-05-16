---
custom_edit_url: null
sidebar_position: 1
---

# Authentication with client credentials

You can register an unattended application to create client credentials that you use to obtain a token to access Snow Atlas APIs. This allows you to access the data from Snow Atlas APIs for reporting and visualization using third-party tools or scripts.

## Application registration

An application registration allows the application to authenticate using the client credentials grant of OAuth2 to obtain an access token as described in [Client credentials grant](https://www.rfc-editor.org/rfc/rfc6749#section-4.4). For more information, see [Access tokens](../../get-started-with-apis/api-authentication/#access-tokens).

When you create an application registration in Snow Atlas, you set the permissions to grant to the application according to the least privilege principle. The application registration generates a client ID and client secret. For more information on registering an application in Snow Atlas, see [Application registrations](https://docs.snowsoftware.com/snow-atlas/en/UUID-6ff2fc00-4eef-a348-70ad-15ca17fc603c.html).

## Authentication from applications or scripts

To authenticate from your application or script, using the credentials from Snow Atlas, you must construct a token request to the IDP token endpoint, to obtain an access token:

```
https://{region}.snowsoftware.io/idp/api/connect/token
```
:::note

You can find your **Data region** in the **Snow Atlas settings** menu, in **Application registrations**. Your **Data region** is on the **General information** tab. For further information, see [General information](https://docs.snowsoftware.com/snow-atlas/en/UUID-6ff2fc00-4eef-a348-70ad-15ca17fc603c.html).

:::

The request must have a content type of `application/x-www-form-urlencoded`. See an example below, where you replace `YOUR_CLIENTID` and `YOUR_CLIENTSECRET` with the client ID and client secret for the application:

    grant_type=client_credentials&client_id=YOUR_CLIENTID&client_secret=YOUR_CLIENTSECRET

The token endpoint returns a token response with the access token that you can use in the header of API authorization calls. For more information on the token response, see [Token response](../../get-started-with-apis/api-authentication/#token-response).

The application is responsible for renewing the access token when it expires. Use of the token endpoint is subject to rate limiting. For more information on rate limiting, see [Rate limiting](../rate-limiting.mdx).

## Using OpenID Connect as an extension of the client credentials grant

Snow Atlas also supports returning an identity token as an extension to the OAuth2 client credentials grant, by requesting the `openid` scope as part of the token request. See an example below, where you replace `YOUR_CLIENTID` and `YOUR_CLIENTSECRET` with the client ID and client secret for the application:

```
grant_type=client_credentials&client_id=YOUR_CLIENTID&client_secret=YOUR_CLIENTSECRET&scope=openid
```   

When used as an extension of the client credentials grant, the identity token provides basic metadata on the application itself, such as, the tenant claim that identifies the id of the tenant to which the application is bound. Unlike the access token, the application can parse the claims of the identity token to construct tenant specific URLs or enrich logs and interfaces.