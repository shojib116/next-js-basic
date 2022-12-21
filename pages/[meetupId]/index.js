import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = props => {
  const { meetupData } = props;
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail 
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </>
  )
}

export const getStaticPaths = async _ => {
  
  const client = await MongoClient.connect('mongodb+srv://shojib116:shojib116@test-cluster.ibtj2n5.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map(meetup => ({ params: {meetupId: meetup._id.toString()}}))
  }
}

export const getStaticProps = async context => {
  
  const meetupId = await ObjectId(context.params.meetupId);

  const client = await MongoClient.connect('mongodb+srv://shojib116:shojib116@test-cluster.ibtj2n5.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetup = await meetupsCollection.findOne({_id: meetupId});

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description
      }
    }
  }
}


export default MeetupDetails;