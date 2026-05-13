> LPRMS( Land/Property Registration Management System)

> Desc

Land officers manually record owner details such as national ID, full name, contact information and address on paper files. Parcel details including parcel number, location, area in square metres, land use type and current owner are also recorded manually. Whenever an ownership transfer occurs, the officer fills out a transfer form containing the old owner, new owner, transfer date and transfer fee. Payment receipts are written by hand, making it difficult to track payment history and generate accurate reports.The system should allow land registration officers to record owner and parcel details digitally, process ownership transfers, automatically calculate transfer fees, and generate registration reports in real time.

> Tables

1.  `LandOwner`: (OwnerId, FirstName, LastName, NationalId, PhoneNumber, Email, Address)
2.  `LandParcel`: (ParcelNumber, Location, AreaSqm, LandUseType, ParcelStatus)
3.  `OwnershipTransfer`: (TransferDate, TransferFee, TransferReason)
4.  `PaymentReceipt`: (AmountPaid, PaymentDate, PaymentMethod)

> Note:

1.  **Insert** operation should be used on all four (4) forms (LandOwner, LandParcel, OwnershipTransfer and PaymentReceipt)
2.  **Delete, update, retrieve** operations should only be used on OwnershipTransfer form.

**Database : LPMS**

> APi Router

<For User

**POST(Register)** : `http://localhost:3400/api/user/register`(name,email,password)
**POST(Login)** : `http://localhost:3400/api/user/login`(email,password)

<For Land Owner

**POST(Register)** : `http://localhost:3400/api/owner/register`(nationalId, first_name, last_name, email, telephone, address )
**GET(Display All)** : `http://localhost:3400/api/owner/display`
**GET(Display One By Id)** : `http://localhost:3400/owner/display/:id`

<For Land Parcel

**POST(Register)** : `http://localhost:3400/api/land/register`(area_sqm, location, parcel_status, land_use_type, land_owner_id )
**GET(Display All)** : `http://localhost:3400/api/land/display`
**GET(Display One By Id)** : `http://localhost:3400/land/display/:id`

<For Ownership Transfer

**POST(Register)** : `http://localhost:3400/api/transfer/register`( parcelId, transfer_date, old_ownerId, new_ownerId,transfer_reason)
**GET(Display All)** : `http://localhost:3400/api/transfer/display`
**PUT(Update One By Id)** : `http://localhost:3400/transfer/update/:id`( parcelId, transfer_date, old_ownerId, new_ownerId,transfer_reason)
**DELETE(Delete One By Id)** : `http://localhost:3400/transfer/delete/:id`

<For Payment Receipt

**POST(Register)** : `http://localhost:3400/api/receipt/register`(transferId, amount_paid, payment_date, payment_method )
**GET(Display All)** : `http://localhost:3400/api/receipt/display`
**GET(Display One By Id)** : `http://localhost:3400/receipt/display/:id`
