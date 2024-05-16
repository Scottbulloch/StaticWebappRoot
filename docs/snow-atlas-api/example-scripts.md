---
custom_edit_url: null
sidebar_position: 2
---

# Example scripts
Here you can find an example script to authenticate and an example script to export a list of computers using Snow Atlas APIs.

You must authenticate to acquire an access token before you can successfully execute any other Snow Atlas API scripts. See [Authenticate using Powershell or Python](https://snowsoftwareglobal.github.io/snow-atlas-api/example-scripts#authenticate-using-powershell-or-python).

## Requirements

To authenticate using Powershell or Python, you need the following data:
* Client ID
* Client secret
* Data region

You can get the **Client ID** and **Client secret** from Snow Atlas by creating an application registration with the correct permission set for the actions that will be performed. For more information, see [Manage application registrations](https://docs.snowsoftware.com/snow-atlas/en/UUID-e22cf316-49f3-8733-f79b-7df561256a2d.html).

:::note

You can find your **Data region** in the **Snow Atlas settings** menu, in **Application registrations**. Your **Data region** is on the **General information** tab. For more information, see [Application registrations](https://docs.snowsoftware.com/snow-atlas/en/UUID-6ff2fc00-4eef-a348-70ad-15ca17fc603c.html).

:::

## Authenticate using Powershell or Python

Snow Atlas authentication is governed by the Snow Atlas Identity Provider (IDP). Snow Atlas APIs are protected by access tokens issued by the IDP.

1. To acquire an access token, replace $client_id, $client_secret, and $Region in the scripts below with **Client ID**, **Client secret**, and **Data region**, respectively, from **Application registrations** in Snow Atlas.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="ps" label="PowerShell">

```ps
#Connect to Snow Atlas
    $client_id = 'XXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXX'
    $client_secret = 'XXXXXXXXXXXXXXXXXXXXXXX' 
    $Region = "XXXXXXXXXX"

#Get token
    $TokenContentType = 'application/x-www-form-urlencoded' 
    $Body = @{grant_type = 'client_credentials'
            client_id = $client_id 
            client_secret = $client_secret
        } 
    $Tokenuri =  "https://$Region.snowsoftware.io/idp/api/connect/token"
    $Tokendata = Invoke-WebRequest -Uri $Tokenuri -ContentType $TokenContentType -Method Post -Body $body
    if($Tokendata.Statuscode -eq "200"){
        Write-host "Token Acquired"
        $Token = ($TokenData.Content  | ConvertFrom-Json).access_token
    }

#Print token
    Write-host $Token    
```

</TabItem>
<TabItem value="py" label="Python">

```py
import requests
import urllib
import json

#Connect to Snow Atlas
client_id = 'XXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXX'
client_secret = 'XXXXXXXXXXXXXXXXXXXXXXXX' 
Region = "XXXXXXXX"

#Format URL
baseurl  = Region+".snowsoftware.io/idp/api/connect/token?"
url = "https://"+Region+".snowsoftware.io/idp/api/connect/token"
params = {'grant_type': 'client_credentials', 'client_id': client_id, 'client_secret': client_secret}
fullUri = url + urllib.parse.urlencode(params)

#Get token
headers = {'Content-Type': 'application/x-www-form-urlencoded'}
data = requests.post(url, params, headers)
jsondata = data.content
content = json.loads(jsondata)
token = content['access_token']
print(token)
```

</TabItem>
</Tabs>

## Get and export a list of computers
You can export a list of computers to a CSV file using the Snow Atlas SAM computers API and the script below.

1. Replace $client_id, $client_secret, and $Region in the scripts below with **Client ID**, **Client secret**, and **Data region**, respectively, from **Application registrations** in Snow Atlas. Also specify the file output location $CSVPath.

<Tabs>
<TabItem value="ps" label="PowerShell">

```ps
#Connect to Atlas
    $client_id = 'XXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXX'
    $client_secret = 'XXXXXXXXXXXXXXXXXXXXXXXXX' 
    $Region = "XXXXXXXXXXXXXXX"
    $CSVPath  = "ComputerExport.csv"

#Get Token
    $TokenContentType = 'application/x-www-form-urlencoded' 
    $Body = @{grant_type = 'client_credentials'
            client_id = $client_id 
            client_secret = $client_secret
        } 
    $Tokenuri =  "https://$Region.snowsoftware.io/idp/api/connect/token"
    $Tokendata = Invoke-WebRequest -Uri $Tokenuri -ContentType $TokenContentType -Method Post -Body $body
    if($Tokendata.Statuscode -eq "200"){
        Write-host "Token Acquired"
        $Token = ($TokenData.Content  | ConvertFrom-Json).access_token
    }

    
#Get Computers (Paginated)
    $ContentType = 'application/json' 
    $headers = @{Authorization = ("Bearer {0}" -f $Token) } 
    #Paginate Starting at Page 1
    $Page = 1
    $itemnumber = 1
    $ComputerObjects = @()
    Do{
        $ComputersUri = "https://$Region.snowsoftware.io/api/sam/estate/v1/computers?page_size=100&page_number=$page"
        $ComputerData = Invoke-RestMethod $ComputersUri -Method 'GET' -Headers $headers -ContentType $ContentType
        $Content = $ComputerData.items
        $Count = $ComputerData.items.count 
    
        $Content | ForEach-Object {           
        $Computerobject = [PSCustomObject]@{ 
            itemNumber = $itemnumber
            domain = $_.domain
            hostname = $_.hostName
            id = $_.id
            ipAddress = $_.ipAddress
            isPortable = $_.isPortable
            isServer = $_.isServer
            isVDI = $_.isVDI
            isVirtual = $_.isVirtual
            lastScanDate = $_.lastScanDate
            links = $_.links.href
            manufacturer = $_.manufacturer
            model = $_.model
            operatingSystem = $_.operatingSystem
            organizationId = $_.organizationId
            status = $_.status
        }
        $ComputerObjects += $Computerobject
        $itemnumber++
    }
    $page++ 
    }  
    while ($Count -ge 100) 

$ComputerObjects | Export-Csv -Path $CSVPath -Force
```

</TabItem>
</Tabs>
