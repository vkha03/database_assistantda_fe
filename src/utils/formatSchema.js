// Hàm này chuyên bóc tách dữ liệu JSON lộn xộn thành Array chuẩn UI
export default (rawSchema) => {
  // 1. Chốt chặn: Nếu rỗng hoặc tịt thì trả về mảng rỗng
  if (!rawSchema) return [];

  // 2. Ép kiểu: Lỡ như Backend trả về chuỗi String thì Parse nó ra Object, còn là Object sẵn rồi thì thôi
  const schemaObj =
    typeof rawSchema === "string" ? JSON.parse(rawSchema) : rawSchema;

  // 3. Object.entries để biến Object thành Array [key, value]
  return Object.entries(schemaObj).map(([tableName, tableData]) => {
    // Xử lý từng cột trong bảng
    const formattedColumns = tableData.columns.map((colStr) => {
      // colStr ví dụ: "order_id (int unsigned) [FK -> orders.id]"

      // Tìm vị trí của dấu ngoặc () để moi cái Type ra
      const firstParen = colStr.indexOf("(");
      const lastParen = colStr.lastIndexOf(")");

      let name = colStr;
      let type = "";

      // Nếu có ngoặc tròn -> Tách Tên cột và Kiểu dữ liệu
      if (firstParen !== -1 && lastParen !== -1) {
        name = colStr.substring(0, firstParen).trim();
        type = colStr.substring(firstParen + 1, lastParen).trim();
      }

      // Dùng includes để soi xem nó có chữ [PK] hay [FK] không
      const isPk = colStr.includes("[PK]");
      const isFk = colStr.includes("[FK");

      return { name, type, isPk, isFk };
    });

    // Trả về đúng format mà cái Offcanvas đang khát khao chờ đợi
    return {
      tableName: tableName,
      columns: formattedColumns,
    };
  });
};
