<!--
 ___ _            _ _    _ _    __
/ __(_)_ __  _ __| (_)__(_) |_ /_/
\__ \ | '  \| '_ \ | / _| |  _/ -_)
|___/_|_|_|_| .__/_|_\__|_|\__\___|
            |_| 
-->
![](https://docs.simplicite.io//logos/logo250.png)
* * *

`BytelTED` module definition
============================

Bouygues Telecom
----------------

Module TED

`ByteltedParcours` business object definition
---------------------------------------------

Parcours

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      |
|--------------------------------------------------------------|------------------------------------------|----------|-----------|----------|----------------------------------------------------------------------------------|
| `byteltedPrcNom`                                             | char(255)                                | yes*     | yes       |          | -                                                                                |
| `byteltedPrcDescription`                                     | html(1000000)                            |          | yes       |          | -                                                                                |
| `byteltedPrcImgId` link to **`ByteltedImage`**               | id                                       |          | yes       |          | -                                                                                |
| _Ref. `byteltedPrcImgId.byteltedImgCode`_                    | _char(50)_                               |          |           |          | _Code image_                                                                     |
| _Ref. `byteltedPrcImgId.byteltedImgImage`_                   | _image_                                  |          |           |          | _Fichier image_                                                                  |
| `byteltedPrcDiagrammeXML`                                    | document                                 |          | yes       |          | -                                                                                |

`ByteltedPrcUsr` business object definition
-------------------------------------------



### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      |
|--------------------------------------------------------------|------------------------------------------|----------|-----------|----------|----------------------------------------------------------------------------------|
| `byteltedPrcUsrPrcId` link to **`ByteltedParcours`**         | id                                       | yes*     | yes       |          | -                                                                                |
| `byteltedPrcUsrUsrId` link to **`ByteltedUser`**             | id                                       | yes*     | yes       |          | -                                                                                |
| _Ref. `byteltedPrcUsrUsrId.usr_login`_                       | _regexp(100)_                            |          |           | yes      | _Login_                                                                          |
| _Ref. `byteltedPrcUsrUsrId.usr_last_name`_                   | _char(50)_                               |          |           | yes      | _Last name_                                                                      |
| _Ref. `byteltedPrcUsrUsrId.usr_first_name`_                  | _char(50)_                               |          |           | yes      | _First name_                                                                     |
| _Ref. `byteltedPrcUsrUsrId.usr_email`_                       | _email(100)_                             |          |           | yes      | _Email address_                                                                  |

`ByteltedUser` business object definition
-----------------------------------------

Utilisateur

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      |
|--------------------------------------------------------------|------------------------------------------|----------|-----------|----------|----------------------------------------------------------------------------------|

`ByteltedImage` business object definition
------------------------------------------

Images

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      |
|--------------------------------------------------------------|------------------------------------------|----------|-----------|----------|----------------------------------------------------------------------------------|
| `byteltedImgCode`                                            | char(50)                                 | yes*     | yes       |          | Code image                                                                       |
| `byteltedImgImage`                                           | image                                    | yes      | yes       |          | Fichier image                                                                    |

`ByteltedBpmnEditor` external object definition
-----------------------------------------------




