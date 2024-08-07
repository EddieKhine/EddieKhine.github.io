import { Container, Button, Table } from "react-bootstrap";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import style from "./mystyle.module.css";

function QuotationTable({ data, deleteByIndex, clearItems }) {
  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container>
        <h1 className={style.tableTitle}>Quotation</h1>
        <p><CiShoppingCart /> No items</p>
      </Container>
    );
  }

  const total = data.reduce((acc, v) => acc + (v.qty * v.ppu - v.discount), 0);
  const totalDiscount = data.reduce((acc, v) => acc + parseFloat(v.discount), 0);

  const handleDelete = (index) => {
    deleteByIndex(index);
  };

  return (
    <Container>
      <h1 className={style.tableTitle}>Quotation</h1>
      <Button variant="outline-dark" onClick={clearItems} className={style.clearButton}>
        <MdClear /> Clear
      </Button>
      <Table striped bordered hover className={`mt-3 ${style.quotationTable}`}>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th className={style.textRight}>Price Per Unit</th>
            <th className={style.textRight}>Quantity</th>
            <th className={style.textRight}>Discount</th>
            <th className={style.textRight}>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
  {data.map((v, index) => (
    <tr
      key={index}
      className={index % 2 === 0 ? style.evenRow : style.oddRow}
    >
      <td>{index + 1}</td>
      <td>{v.item}</td>
      <td className={style.textRight}>{v.ppu.toFixed(2)}</td>
      <td className={style.textRight}>{v.qty}</td>
      <td className={style.textRight}>{v.discount.toFixed(2)}</td>
      <td className={style.textRight}>{(v.qty * v.ppu - v.discount).toFixed(2)}</td>
      <td className={style.textRight}>
        <Button
          variant="outline-danger"
          onClick={() => handleDelete(index)}
          className={style.deleteButton}
        >
          <BsFillTrashFill />
        </Button>
      </td>
    </tr>
  ))}
</tbody>

        <tfoot>
          <tr>
            <td colSpan={4} className={style.textRight}><strong>Total</strong></td>
            <td className={style.textRight}><strong>{totalDiscount.toFixed(2)}</strong></td>
            <td className={style.textRight}><strong>{total.toFixed(2)}</strong></td>
            <td></td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

export default QuotationTable;
