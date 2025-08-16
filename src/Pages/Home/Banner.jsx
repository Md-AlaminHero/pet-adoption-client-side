import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <Carousel autoPlay='true' infiniteLoop={true} showThumbs={false}>
            <div>
                <img src="https://i.postimg.cc/RF9WGK4h/slide-03.jpg" />
                {/* <p className="legend">Legend 1</p> */}
            </div>
            <div>
                <img src="https://i.postimg.cc/nzHLqxGQ/slide-02.jpg" />
                {/* <p className="legend">Legend 2</p> */}
            </div>
            <div>
                <img src="https://i.postimg.cc/vm4hbRVf/slide-01.jpg" />
                {/* <p className="legend">Legend 3</p> */}
            </div>
        </Carousel>
    );
};

export default Banner;