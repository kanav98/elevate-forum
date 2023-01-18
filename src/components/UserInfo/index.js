import './styles.css'

const UserInfo = ({ fullName, userName, email, phoneNo, website, address, companyDetails }) => {
    return (
        <div className="userInfo">
            <h2>{fullName}</h2>
            <p className="text_section">
                <span>{userName}</span>
                <span>{email}</span>
                <span>{phoneNo}</span>
                <span><a href={website} target="_blank" rel="noopener noreferrer">{website}</a></span>
            </p>
            <h3>Company Details</h3>
            <p className="text_section">
                <span>{address?.street} {address?.suite}</span>
                <span>{address?.city} {address?.zipcode}</span>
            </p>
            <h3>Address</h3>
            <p className="text_section">
                <span>{companyDetails?.name}</span>
                <span>{companyDetails?.bs} {companyDetails?.catchPhrase}</span>
            </p>
        </div >
    )
}

export default UserInfo;