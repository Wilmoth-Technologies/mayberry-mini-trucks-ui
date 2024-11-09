import { Accordion } from 'flowbite-react';

const topics = [
    {
      title: 'General Mini Truck Questions',
      questions: [
        {
          question: 'How Long Does a Mini Truck Last?',
          answer: 'Mini Trucks typically go for 120,000 miles and beyond. It depends on how well you care for them. Upon delivery your truck is fully serviced and all major systems are functional. We keep all major parts for servicing in our inventory for you to purchase and we offer preventive maintenance services to prolong the life of your Mini Truck.'
        },
        {
          question: 'Are they Street Legal?',
          answer: 'Absolutely! All of our Japanese Mini-Trucks come with a clear North Carolina title transferable to the new owner.'
        },
        {
            question: 'Do They Go "Off-Road"?',
            answer: 'Japanese Mini-Trucks are completely at home in the woods or on the trails. Since they are four wheel drive they can go anywhere a side-by-side or four wheeler can go. These versatile little vehicles are widely utilized throughout Asia, in agriculture, fisheries, construction and even for firefighting. More than half the time they go to family farmers and hunters.'
        },
        {
            question: 'What are they most frequently used for?',
            answer: 'Many mini trucks are used as campus maintenance vehicles, on golf courses, in and around factories, in camps and camp grounds and as an ATV/UTV alternative for the outdoorsman, hunter, rancher, farmer, fisherman.'
        },
        {
            question: 'Can We Get Insurance?',
            answer: 'Yes, you can. Liability insurance is available from every established insurance company. Contact your local insurance agent and you should have no problem obtaining liability coverage. Hint… Tell the insurance agent they need to enter the VIN manually.'
        },
      ]
    },
    // {
    //   title: 'How Our Process Works',
    //   questions: [
    //     {
    //       question: 'What payment methods do you accept?',
    //       answer: 'To be Determined...'
    //     },
    //     {
    //       question: 'How do I get the Title and How long does it take?',
    //       answer: 'To be Determined...'
    //     },
    //   ]
    // },
  ];
  

export default function FAQ() {
    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h1>
    
          {topics.map((topic, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">{topic.title}</h2>
              <Accordion alwaysOpen={false} collapseAll>
                {topic.questions.map((q, idx) => (
                  <Accordion.Panel key={idx}>
                    <Accordion.Title className='text-action-yellow'>
                      {q.question}
                    </Accordion.Title>
                    <Accordion.Content>
                      <p className="text-grey-primary">{q.answer}</p>
                    </Accordion.Content>
                  </Accordion.Panel>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      );
}