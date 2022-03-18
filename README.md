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

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bytel-modules-BytelTED&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=bytel-modules-BytelTED)

Module TED

`ByteltedCommunicationHistoric` business object definition
----------------------------------------------------------

Historique des communications

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      |
|--------------------------------------------------------------|------------------------------------------|----------|-----------|----------|----------------------------------------------------------------------------------|
| `row_idx`                                                    | int(11)                                  | yes*     | yes       |          | History record index                                                             |
| `row_ref_id` link to **`ByteltedCommunication`**             | id                                       | yes*     |           |          | Record row ID                                                                    |
| `created_by_hist`                                            | char(100)                                | yes*     |           |          | Created by                                                                       |
| `created_dt_hist`                                            | datetime                                 | yes*     |           |          | Created date                                                                     |
| `byteltedComNom`                                             | char(255)                                | yes*     | yes       |          | Nom de la communication                                                          |
| `byteltedComIdTemplate`                                      | char(100)                                |          | yes       |          | Identifiant template                                                             |
| `byteltedComStatut`                                          | enum(50) using `BYTELTED_COM_STATUT` list | yes      | yes       |          | Statut de la communication                                                       |

### Lists

* `BYTELTED_COM_STATUT`
    - `BROUILLON` Brouillon
    - `A_VALIDER` A valider
    - `VALIDE` Validé
    - `ARCHIVE` Archivé

`ByteltedImage` business object definition
------------------------------------------

Images

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      |
|--------------------------------------------------------------|------------------------------------------|----------|-----------|----------|----------------------------------------------------------------------------------|
| `byteltedImgCode`                                            | char(50)                                 | yes*     | yes       |          | Code image                                                                       |
| `byteltedImgImage`                                           | image                                    | yes      | yes       |          | Fichier image                                                                    |

`ByteltedUser` business object definition
-----------------------------------------

Utilisateurs

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      |
|--------------------------------------------------------------|------------------------------------------|----------|-----------|----------|----------------------------------------------------------------------------------|

`ByteltedParcours` business object definition
---------------------------------------------

Parcours

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      |
|--------------------------------------------------------------|------------------------------------------|----------|-----------|----------|----------------------------------------------------------------------------------|
| `byteltedPrcNom`                                             | char(255)                                | yes*     | yes       |          | Nom du parcours                                                                  |
| `byteltedPrcDescription`                                     | html(1000000)                            |          | yes       |          | Description du parcours                                                          |
| `byteltedPrcImgId` link to **`ByteltedImage`**               | id                                       |          | yes       |          | Image du parcours                                                                |
| _Ref. `byteltedPrcImgId.byteltedImgCode`_                    | _char(50)_                               |          |           |          | _Code image_                                                                     |
| _Ref. `byteltedPrcImgId.byteltedImgImage`_                   | _image_                                  |          |           |          | _Fichier image_                                                                  |
| `byteltedPrcDiagrammeXML`                                    | document                                 |          | yes       |          | Fichier BPMN du diagramme                                                        |

`ByteltedPrcUsr` business object definition
-------------------------------------------

Responsable parcours

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      |
|--------------------------------------------------------------|------------------------------------------|----------|-----------|----------|----------------------------------------------------------------------------------|
| `byteltedPrcUsrPrcId` link to **`ByteltedParcours`**         | id                                       | yes*     | yes       |          | Parcours                                                                         |
| _Ref. `byteltedPrcUsrPrcId.byteltedPrcNom`_                  | _char(255)_                              |          |           |          | _Nom du parcours_                                                                |
| _Ref. `byteltedPrcUsrPrcId.byteltedPrcImgId`_                | _id_                                     |          |           |          | _Image du parcours_                                                              |
| _Ref. `byteltedPrcImgId.byteltedImgImage`_                   | _image_                                  |          |           |          | _Fichier image_                                                                  |
| `byteltedPrcUsrUsrId` link to **`ByteltedUser`**             | id                                       | yes*     | yes       |          | Utilisateur                                                                      |
| _Ref. `byteltedPrcUsrUsrId.usr_login`_                       | _regexp(100)_                            |          |           | yes      | _Login_                                                                          |
| _Ref. `byteltedPrcUsrUsrId.usr_last_name`_                   | _char(50)_                               |          |           | yes      | _Last name_                                                                      |
| _Ref. `byteltedPrcUsrUsrId.usr_first_name`_                  | _char(50)_                               |          |           | yes      | _First name_                                                                     |
| _Ref. `byteltedPrcUsrUsrId.usr_email`_                       | _email(100)_                             |          |           | yes      | _Email address_                                                                  |

`ByteltedCommunication` business object definition
--------------------------------------------------

Communications

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      |
|--------------------------------------------------------------|------------------------------------------|----------|-----------|----------|----------------------------------------------------------------------------------|
| `byteltedComPrcId` link to **`ByteltedParcours`**            | id                                       | yes      | yes       |          | Parcours de la communication                                                     |
| _Ref. `byteltedComPrcId.byteltedPrcNom`_                     | _char(255)_                              |          |           |          | _Nom du parcours_                                                                |
| `byteltedComType`                                            | enum(50) using `BYTELTED_COM_TYPE` list  | yes      | yes       |          | Type de la communication                                                         |
| `byteltedComStatut`                                          | enum(50) using `BYTELTED_COM_STATUT` list | yes      | yes       |          | Statut de la communication                                                       |
| `byteltedComNom`                                             | char(255)                                | yes*     | yes       |          | Nom de la communication                                                          |
| `byteltedComIdTemplate`                                      | char(100)                                |          | yes       |          | Identifiant template                                                             |
| `byteltedComDescription`                                     | html(1000000)                            |          | yes       |          | Description                                                                      |
| `byteltedComContenu`                                         | document                                 |          | yes       |          | Fichier du contenu de la communication                                           |
| `byteltedComVariables`                                       | text(1000000)                            |          | yes       |          | Variables du contenu                                                             |

### Lists

* `BYTELTED_COM_TYPE`
    - `EMAIL` E-mail
    - `SMS` SMS
    - `COURRIER` Courrier
    - `AUTRE` Autre
* `BYTELTED_COM_STATUT`
    - `BROUILLON` Brouillon
    - `A_VALIDER` A valider
    - `VALIDE` Validé
    - `ARCHIVE` Archivé

`ByteltedBpmnEditor` external object definition
-----------------------------------------------

Editeur BPMN


