export const EventsList = ({events}) => {
    return (
        <section className='leftEvents'>
            <div className='eventsList'>
                {events.map(event => { return ( {event.park.name}  ) } ) }

                    ))}
            </div>
        </section>
    )
}