function ContactList({ toggleContactCard, sortedContacts}) {
    return (
      <div className="contact-list">
        <table>
          <tbody>
            {sortedContacts.map((contacts) => (
                <tr key={contacts.id} onClick={() => toggleContactCard(contacts)}>
                  <td className="contacts-individual">{contacts.name}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default ContactList;
    