import climateSvg from '../Images/climate.svg';
import respondSvg from '../Images/respond.svg';
import smsSvg from '../Images/sms2.svg';

export const HowItWorksData = [
    {
      id: 1,
      title: "LGU'S CLIMATE INFORMATION CENTER (CIC)",
      subTitle: `LGUs receive weather forecasts and climate outlooks from DOST-PAGASA.
      LGUs through their Municipal Climate Information Center, managed collaboratively by the MDRRMO and the MAO offices, 
      interpret PAGASA forecast products and information into appropriate local risk management advisories.
      Using this SMS tool, LGUs select the livelihoods that are at risk  to certain hazards for a particular period and choose
      corresponding risk management and advise options. Such advise is then sent to registered users/message recipients of the 
      system. LGUs can register as many users/recipients  as needed. Users will need to confirm their agreement 
      to receive regular warnings and advisories by texting INFO to 21589998 for Globe User and to 225659998 for non-Globe User.
      `,
      image: climateSvg,
      alt: "LGU CLIMATE",
      direction: "row",
      effect : "fade-right"
    },
    {
      id: 2,
      title: "Registered users in the system will receive daily, weekly or seasonal advise depending on advisory arrangement with LGUs. ",
      subTitle: `(LGU, PAGASA and R1  can send advise to all registered numbers. LGU will send regular weekly and even seasonal advisories (3 mos) 
      as well as during tropical cyclone (TC) emergencies and other rapid onset events whenever they can. PAGASA will provide advisories during TC
      events and other warnings of national scope. `,
      image: smsSvg,
      alt: "BRGY",
      direction: "row-reverse",
      effect : "fade-left"
    },
    {
      id: 3,
      title: "Users Feedback",
      subTitle: `Users may give feedback on climate related impacts in their specific villages so LGUs can record these events and act on it correspondingly. 
      SMS users can also request more information and provide feedback on the appropriateness and/ or relevance of the advisories sent to them.`,
      image: respondSvg,
      alt: "MEN AND WOMEN",
      direction: "row",
      effect : "fade-right"
    }
  ]
  