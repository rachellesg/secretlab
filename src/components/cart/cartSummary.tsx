const CartSummary: React.FC<{ totalPrice: number; totalDiscount: number }> = ({
  totalPrice,
  totalDiscount,
}) => {
  return (
    <>
      <div className="flex justify-between items-center my-2">
        <div>Subtotal:</div>
        <div className="font-bold">${totalPrice}</div>
      </div>
      <div className="flex justify-between items-center text-gray-400 my-2">
        <div>Total savings:</div>
        <div>${Math.round(totalDiscount)}</div>
      </div>
      <div className="flex justify-between items-center border-t mt-5 pt-5">
        <div>Grand total:</div>
        <div className="font-bold">${totalPrice}</div>
      </div>
    </>
  );
};

export default CartSummary;
