import {formatDate} from "./utils";

export const inventoryHistoryFields = [
    {
        name: "STT",
        field: "STT",
        columnWidth: 0.1
    },
    {
        name: "Ngày Giao",
        field: "dateDelivered",
        handle: (v) => {
            return formatDate(new Date(v));
        },
        columnWidth: 0.3
    },
    {
        name: "Ngày $type kho",
        field: "dateReceived",
        handle: (v) => {
            return formatDate(new Date(v));
        },
        columnWidth: 0.3
    },
    {
        name: "Số lượng $type",
        field: 'totalQuantity',
        handle: (v) => {
          return v.seperateNumber()  + " đơn vị sp"
        },
        columnWidth: 0.15
    },
    {
        name: "Tổng giá $type",
        field: 'totalPrice',
        handle: (v) => {
            return v.seperateNumber() + " VND"
        },
        columnWidth: 0.15
    }
];

export const exportActionFields = [
    {
        name: "",
        field: "checkbox",
        columnWidth: 0.05
    },
    {
        name: "TÊN SẢN PHẨM",
        field: "name",
        columnWidth: 0.3
    },
    {
        name: "GIÁ BÁN",
        columnWidth: 0.2
    },
    {
        name: "SỐ LƯỢNG XUẤT",
        columnWidth: 0.2
    }
];

