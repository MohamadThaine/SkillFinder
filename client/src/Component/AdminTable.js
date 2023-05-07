import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import getValueByNestedProperty from '../Helper/getValueByNestedProperty';

const AdminTable = ({ columns, data, rowButtonText, onRowClick, onBtnClick }) => {
  return (
    <TableContainer component={Paper} className="max-height-table">
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                sx={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => onRowClick(row)}
              hover
              tabIndex={-1}
              style={{ cursor: 'pointer' }}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell key={column.id} align="center">   
                  {column.id === rowButtonText ? (
                    <Button variant="contained" color="error" onClick={e => onBtnClick(e,row.id)}>
                      {rowButtonText}
                    </Button>
                  ) : (
                    getValueByNestedProperty(row, column.id)
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminTable;
