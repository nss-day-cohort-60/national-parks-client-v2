import { useEffect, useState } from "react"

export const Header = ({ events, park_id }) => {
    const [headerEvents, setHeaderEvents] = useState([]);
  
    useEffect(() => {
      if (events) {
        setHeaderEvents(events);
      }
    }, [events]);
  
    console.log(park_id);
  
    if (park_id === 0) {
      return (
        <section className="Events">
          <div className="EventsHeader">
            Viewing Events for All Parks
          </div>
        </section>
      );
    } else {
      return (
        <section className="Events">
          <div className="EventsHeader">
            Viewing Events for {headerEvents.park?.name || ''}
          </div>
        </section>
      );
    }
  };
  