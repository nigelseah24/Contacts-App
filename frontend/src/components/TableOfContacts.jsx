function TableOfContacts({ toggleContactCard, sortedContacts}) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {sortedContacts.map((contacts) => (
                <tr key={contacts.id} onClick={() => toggleContactCard(contacts)} className="contacts-individual">
                  <td>{contacts.name}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default TableOfContacts;
    