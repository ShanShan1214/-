import partA from "../service/partA";

export default {
    user: {
        login: "/api/users/login"
    },
    partA: {
        list: "/api/parta/list",
        add: "/api/parta/add",
    },
    partB: {
        list: "/api/partb/list",
        add: "/api/partb/add",
    },
    designation: {
        list: "/api/product/list",
        add: "/api/product/add"
    },
    color: {
        list: "/api/productcolor/list",
        add: "/api/productcolor/add"
    },
    directions:{
        list:"/api/productdirection/list",
        add: "/api/productdirection/add"
    },
    source:{
        list:"/api/productlight/list",
        add: "/api/productlight/add"
    },
    order:{
        list:"/api/order/list",
        add: "/api/order/add"
    }
}