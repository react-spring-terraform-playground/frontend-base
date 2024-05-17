import { MxTableLayout } from "@/ui/view-table";
import { BILLING_ID } from "../constants";
import { useBilling } from "../use-billing";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Stack,
  Button,
} from "@mui/material";

type Props = ReturnType<typeof useBilling>;

export const BillingTable = ({
  view,
  table,
  handleBillingId,
  handleBillingName,
  handlePhone,
  handleMail,
  onClick,
}: Props) => {
  return (
    <>
      <MxTableLayout view={view} colSize={4} />

      <Stack mt={4}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ bgcolor: "#e6e6fa" }}>
              <TableRow>
                <TableCell>請求ID</TableCell>
                <TableCell>請求名</TableCell>
                <TableCell>電話番号</TableCell>
                <TableCell>メールアドレス</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(3)].map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <TextField
                      value={table[i]?.billingId}
                      onChange={() => {
                        handleBillingId(i);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={table[i]?.billingName}
                      onChange={() => {
                        handleBillingName(i);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={table[i]?.phone}
                      onChange={() => {
                        handlePhone(i);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={table[i]?.mail}
                      onChange={() => {
                        handleMail(i);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <Button onClick={onClick}>test</Button>
    </>
  );
};
