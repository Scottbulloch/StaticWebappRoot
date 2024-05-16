---
custom_edit_url: null
sidebar_position: 1
---

# API conventions

There are certain conventions that apply to all Snow Atlas APIs. The following sections describe the conventions and provide some examples.

## Response codes and descriptions

The tables below show the most common response codes from Snow Atlas APIs and provide further information and recommendations, where relevant.

### Successful responses (200 - 299)

| Response code | Response description | Additional information |
| --- |  --- |  --- |
| 200 | OK | Your request succeeded. |
| 201 | Created | Your request created something new. Usually, this is a call that used the POST method and will allow a GET method to retrieve it later. |
| 202 | Accepted | Your request requires more time for the service to process. |
| 204 | No Content | Your request succeeded, but the response message was empty. |
| 206 | Partial Content | Your request to read part of a large binary object succeeded. |

### Client error responses (400 - 499)

| Response code | Response description | Additional information |
| --- |  --- |  --- |
| 400 | Bad Request | Your request is invalid or improperly formed. Consequently, the API server could not understand your request. |
| 401 | Unauthorized | You are not authorized to make the request. This could be because the token is expired or revoked. The recommended action is to reauthenticate and retry once. |
| 403 | Forbidden | The operation you requested is forbidden and cannot be completed. This could be because you don't have the required permissions to use the requested endpoint, or the requested endpoint requires purchasing additional features. The recommended action is to abort. |
| 404 | Not Found | The operation you requested failed because a resource associated with your request could not be found. |
| 405 | Method Not Allowed | The HTTP method associated with your request is not supported. |
| 409 | Conflict | Your request cannot be completed because the requested operation would conflict with an existing item. |
| 429 | Too Many Requests | You have sent too many requests within a given time span. The recommended action is to check the response header for the backoff time. If it exists, it is indicated by the `Retry-After` response header, in seconds. Abort for the duration specified by Retry-After, and retry. |The recommended action is to check the response header for the backoff time. If it exists, it is indicated by the Retry-After response header, in seconds. Abort for the duration specified by Retry-After, and retry.
### Server error responses (500 - 599)

|Response code  |  Response description | Additional information  |
|---------|---------|---------|
|500     |     Internal Server Error    |    Your request failed due to an internal error.     |
|501     |     Not Implemented    |     The operation you requested has not been implemented.    |
|503    |    Service Unavailable     |    Your request can not currently be handled by the server. Please try again later.     |

## Supported primitive data types

Snow Atlas APIs support the following types:

| Types | Details |
| --- |  --- |
| Number | A number including integer numbers (1, 2, 3, -12, 0) and decimal values (12.45) |
| Date | A UTC (RFC3339) formatted datetime (T and Z can be lowercase) |
| Boolean | true/false values are accepted |
| String | An ASCII text string |
| Set | A collection of any of the other data types |

:::note

Unquoted values, if not determined to be number, date, or Boolean, will be treated as a string. Adding quotation marks around a value forces that value to be a string.

:::

## Collections

Collections can be filtered, paginated, and sorted. If a collection is empty, it is included in the structure as empty array (that is, [ ]); a collection is never null or missing from the return body.

### Filter API call results

Many of the endpoints in the Snow Atlas APIs support filtering features which let you receive a limited set of resources from the API that match a set of filters. The OpenAPI endpoints for each respective API will have the “filter” query argument documented if filtering is supported on the specific endpoint.

The filter system supports a variety of comparison operators as well as a set of logical operators. The filter system is very powerful and allows you to specify complex queries as part of your request to the API. The table below details which operators are available and which data types those operators work on:

| Operator Name | Operator | Applies To |
| --- |  --- |  --- |
| Equal | -eq | String, Number, Boolean, Date |
| Not Equal | -ne | String, Number, Boolean, Date |
| Greater Than | -gt | Number, Date |
| Greater or Equal | -ge | Number, Date |
| Less Than | -lt | Number, Date |
| Less or Equal | -le | Number, Date |
| Contains | -contains | String |
| Does Not Contain | -notcontains | String |
| In | -in | Set of any data type |
| Not In | -notin | Set of any data type |
| Exists | -exists | String, Number, Date |
| Starts With | -startswith | String |
| Ends With | -endswith | String |
| AND | -and | All |
| OR | -or | All |
| NOT | -not | All |
| Parenthesis | ( ) | All |

There are several special characters in the filtering grammar that require special handling. When these characters are used in strings, the following rules apply:

| String Type | Character | Rule | Example |
| --- |  --- |  --- |  --- |
| single quoted string | ' | escape | filter=name -contains '\'' |
|  | \ | escape | filter=name -contains '\\' |
| double quoted string | " | escape | filter=name -contains "\"" |
|  | \ | escape | filter=name -contains "\\" |
| unquoted string | 0-9 | cannot start with | filter=name -contains 8abc |
|  | - | cannot start with | filter=name -contains -abc |
|  | ( or ) | cannot contain | filter=name -contains a(bc |
|  | [ or ] | cannot contain | filter=name -contains a[bc |
|  | ' or " | cannot contain | filter=name -contains a'bc |
|  | , | cannot contain | filter=name -contains a,bc |
|  | space | cannot contain | filter =name -contains a bc |
|  | + | cannot contain | filter =name -contains a+bc |

Parentheses group the left-value, the operator, and the right-value into an operand of the filter. They are always required, except for the most basic expressions consisting of a single operator.

**Example**

An expression with a single operator does not require parentheses.

```
GET https://{region}.snowsoftware.io/api/sam/estate/v1/computers?filter=status -eq Quarantined
```
A more complex expression consisting of multiple operators, or even a single -not operator, does require parentheses.

```
GET https://{region}.snowsoftware.io/api/sam/software-registry/v1/applications?filter=(manufacturer -contains Microsoft) -and (isEndOfLife -eq true)
```

The logical operators can be used to chain together filters. Each element of the chain must be surrounded by parentheses.

**Example**

To get all computers where the host name contains "MacBook" and the computer is either quarantined or has not been scanned since a specific date, logical operators and parentheses are required to chain together filters.

```
GET https://{region}.snowsoftware.io/api/sam/estate/v1/computers?filter=(hostName -contains MacBook) -and ((status -eq Quarantined); -or (lastScanDate -le "2022-01-01T00:00:00Z"))
```

:::note

You can find your Data region in the Snow Atlas settings menu, in License details. Your Data region is on the General information tab. For further information, see General information.

:::

### Paginate API call results

For endpoints that return collections of entities, the responses will be paginated for transmission efficiency. You may need to make multiple requests to retrieve the full set of those entities.

The JSON response for paginated collections will include a “pagination” entity in the response body. This entity will tell you the current maximum number of items in the response (the page_size) and the current page in the collection being viewed (page_number). The default for page_number is 1.

When you make requests to endpoints that return collections, you can specify a different value for page_size and page_number which allows you to iterate the full set of entities in the collection.

**Example**

You can set page_number = 1 and page_size = 50 to get a collection of the first 50 Data Center Clusters.

```
GET https://{region}.snowsoftware.io/api/sam/estate/v1/dcc?page_number=1&page_size=50
```

>You can then set page_number = 2 and page_size = 50 to get a collection of the second 50 Data Center Clusters.

```
GET https://{region}.snowsoftware.io/api/sam/estate/v1/dcc?page_number=2&page_size=50
```

Continue this process until you have iterated the whole set. You know you have reached the end of the set when the number of items is less than that of the requested page_size or the “Items” collection element is empty.

**Example**

The empty collection response looks like this.

```
{
"pagination": {
"page_size": 50,
"page_number": 23
},
"items": []
}
```

:::note

You can find your Data region in the Snow Atlas settings menu, in License details. Your Data region is on the General information tab. For further information, see General information.

:::

### Sort API call results

 With the sorting capability in Snow Atlas APIs, you can sort on single properties, or on multiple properties separated by a comma. Sorting may not be supported for all properties.

**Example**

To sort users by name in ascending order (a-z):

```
users?sort=name:asc
```

To sort users by name in descending order (z-a):

```
users?sort=name:desc
```

To sort users by last name, then first name in ascending order (a-z):

```
users?sort=lastName:asc,firstName:asc
```

## HATEOAS links

Snow Atlas APIs provide HATEOAS links in the response to most API calls. The returned items contain a Links section which includes references to additional details related to that endpoint.

This Links section appears in most endpoints where an entity, such as a data center cluster, is returned and facilitates easy navigation through the data model using the API.

**Example**

The result of performing a GET on the `https://{region}.snowsoftware.io/api/sam/estate/v1/dcc` endpoint includes links to the data center cluster details.

```
{
  "items": [
        {
            "description": "Datacenter (auto generated)",
            "hypervisor": "Other",
            "id: "529b2554-5818-4d30-b755-50d10c8f92bd",
            "isAutoGenerated": true,
            "isHighAvailability": false,
            "isHypervisorFromSIM": false,
            "isVMwareDRS": false,
            "links": [
                {
                    "href": "/api/sam/estate/v1/dcc/529b2554-5818-4d30-b755-50d10c8f92bd",
                    "method": "GET",
                    "rel": "details"
                }
            ],
            "name": "WestEurope"
        }
    ],
    "links": [
        {
            "href": "/api/sam/estate/v1/dcc?page_number=1&page_size=25",
            "method": "GET",
            "rel": "first"
        },
        {
            "href": "/api/sam/estate/v1/dcc?page_number=1&page_size=25",
            "method": "GET",
            "rel": "last"
        }
    ],
    "pagination": {
        "page_number": 1,
        "page_size": 25,
        "total_pages": 1
    }
}
```
