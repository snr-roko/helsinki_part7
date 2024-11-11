import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
const Users = ({users}) => {
 return (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell></TableCell>
                <TableCell>Blogs Created</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                users.map(user => (
                    <TableRow key={user.id}>
                        <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                        <TableCell>{user.blogs.length}</TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
 )
}

export default Users