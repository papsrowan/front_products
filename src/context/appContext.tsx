"use client"
import { productService } from "@/services/product";
import { MyContextProps, TGetDataCategory, TProduct } from "@/utils/type";
import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from "react";


export const AppContext = createContext<MyContextProps>({
    isLoadingProduct: true,
    setIsLoadingProduct: () => { },
    listCart: [],
    setListCart: () => { },
    ListProduct: null,
    setListProduct: () => { },
    Category: "tops",
    setCategory: () => { },
    currentUser: {
        email: '',
        firstName: '',
        gender: '',
        id: 0,
        image: '',
        lastName: '',
        username: '',
        refreshToken: '',
        token: ''
    },
    setCurrentUser: () => { }
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(true)
    const [listCart, setListCart] = useState<TProduct[]>([])
    const [ListProduct, setListProduct] = useState<TGetDataCategory>({
        limit: 0,
        skip: 0,
        products: [],
        total: 0
    });
    const [currentUser, setCurrentUser] = useState({
        email: '',
        firstName: '',
        gender: '',
        id: 0,
        image: '',
        lastName: '',
        username: '',
        refreshToken: '',
        token: ''
    })
    const [Category, setCategory] = useState<string>('tops');

    useEffect(() => {
        async function getProducts() {
            const ProductsByCategory: TGetDataCategory = await productService.getProductsByCategory({
                name: Category,
            });
            setListProduct(ProductsByCategory)

            setIsLoadingProduct(false)

        }
        getProducts()

        const currentUser = localStorage.getItem("user")
        if (currentUser) {

            setCurrentUser(JSON.parse(currentUser))
        }
    }, [Category])

    return (
        <AppContext.Provider value={{ ListProduct, setListProduct, Category, setCategory, currentUser, setCurrentUser, listCart, setListCart, setIsLoadingProduct, isLoadingProduct }}>
            {children}
        </AppContext.Provider>
    );
};

