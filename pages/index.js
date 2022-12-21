import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetUpList from '../components/meetups/MeetupList';


function HomePage(props) {
  return (
    <>
      <Head>
        <title>Welcome To Our Meetup History</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MeetUpList meetups={props.meetups} />
    </>
  );
}

export const getStaticProps = async _ => {

  const client = await MongoClient.connect('mongodb+srv://shojib116:shojib116@test-cluster.ibtj2n5.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10
  }
};

export default HomePage;