export const Rating = ({ rating }) => {
    let ratingArray = Array(5).fill(false);
    for (let i = 0; i < rating; i++) {
        ratingArray[i] = true;
    }
    return (
        <>
            {ratingArray.map((rate, index) => (
                <i key={index} className={`text-lg bi ${rate ? "bi-star-fill" : "bi-star"} text-yellow-500 mr-1`}></i>
            ))}
        </>
    )
}
