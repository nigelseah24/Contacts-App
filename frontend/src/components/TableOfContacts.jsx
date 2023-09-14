function TableOfContacts({ toggleContactCard, sortedContacts}) {
    return (
      <div>
        <h2>Contact Table</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {sortedContacts.map((contacts) => (
                <tr key={contacts.id} onClick={() => toggleContactCard(contacts)}>
                  <td>{contacts.name}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default TableOfContacts;
    