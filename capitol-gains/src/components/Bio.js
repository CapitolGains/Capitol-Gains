import Personal from './Personal'

const bio = ({ bio }) => {
    return (
        <>
        {bio.map((personal) => (
            <Personal key={personal.id} personal={personal} />
        ))}
        </>
    )
}

export default bio