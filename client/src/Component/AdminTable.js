import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import getValueByNestedProperty from '../Helper/getValueByNestedProperty';
import { Fragment } from 'react';
const AdminTable = ({ columns, data, rowButtons, onRowClick }) => {
  return (
    <>
      {!data.error && <TableContainer component={Paper} className="max-height-table">
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
                    {rowButtons.find(button => button.text === column.id) ? (
                      <Fragment>
                        {rowButtons.map((button, buttonIndex) => {
                          if (button.text === column.id) {
                            return (
                              <Button
                                key={buttonIndex}
                                variant="contained"
                                color={button.color}
                                onClick={row.ID === undefined? e => button.onClick(e,row) : e => button.onClick(e, row)}
                              >
                                {button.text}
                              </Button>
                            );
                          }
                        })}
                      </Fragment>
                    ) : (
                      getValueByNestedProperty(row, column.id)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </>

  );
};

export default AdminTable;
