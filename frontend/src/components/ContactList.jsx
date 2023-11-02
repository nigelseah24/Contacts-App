import searchIcon from "../icons/search.svg";
import horizontalDots from "../icons/horizontalDots.svg";

function ContactList({ toggleContactCard, sortedContacts}) {
    return (
      <div className="contact-list">
          {sortedContacts.map((contacts) => (
            <div 
              className="contacts-individual"
              key={contacts.id} 
              onClick={() => toggleContactCard(contacts)}
            >
              <img src={searchIcon} className="contact-icon"/>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <span>
                  {contacts.name}
                </span>
                <span style={{fontSize: '9px', color: 'grey', paddingTop: '4px'}}>
                  +{contacts.phone}
                </span>
              </div>
              <img 
                  src={horizontalDots}
                  style={{marginLeft: 'auto', cursor: 'pointer'}}
                />
            </div>     
          ))}
      </div>
    );
  }

  export default ContactList;
    