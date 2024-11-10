const Users = ({users}) => {
 return (
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Blogs Created</th>
            </tr>
        </thead>
        <tbody>
            {
                users.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.blogs.length}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
 )
}

export default Users