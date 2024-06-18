import { productService } from "@/services/product";
import { TGetDataCategory } from "@/utils/type";
import "swiper/css";
import 'swiper/css/effect-fade';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./productCard";

const BigProductCarousel = async () => {

    const productsTop = await getData();
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={100}
                slidesPerView={3}
                centeredSlides={true}
                autoplay
                navigation
                loop

                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                preventClicksPropagation={true}
                onSlideChange={() => console.log('slide change')}
                className="mx-auto"
            >
                {productsTop.products.map((products) => (
                    <SwiperSlide key={products.id} className=" p-11">
                        <ProductCard data={products} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
const getData = async () => {
    const productsTop: TGetDataCategory = await productService.getProductsByCategory({
        name: "tops",
    });
    return productsTop
};
export default BigProductCarousel;
