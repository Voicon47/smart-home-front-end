

type CardItemProps = {
    title: string;
    icon: React.ReactNode;
    number: number;
    description: string;
};

function CardDashBoard(props: CardItemProps) {
    return (
        <div className=" w-[200px] rounded-[25px] bg-white shadow-lg flex flex-col justify-start  ">
            <div className="  p-2 flex flex-col items-start ml-5">
                {/* Icon */}
                <div className='text-[45px]'>
                    {props.icon}
                </div>
                {/* Number Section */}
                <div className="mt-2 text-start">
                    <h2 className="text-3xl font-bold">
                        <span>2680</span> +
                    </h2>
                </div>
                {/* Description Section */}
                <div className="text-start">
                    <p className=" font-sans text-xl font-medium text-gray-500">
                        Building
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CardDashBoard;
