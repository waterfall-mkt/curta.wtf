import type { Metadata } from 'next';

import ContainerLayout from '@/components/layouts/container';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Curta | Terms of Service',
  description: 'See our terms of our service and how they relate to you.',
  keywords: ['ethereum', 'blockchain', 'ctf', 'on-chain', 'security', 'puzzle', 'game', 'nft'],
  themeColor: '#0D1017',
  colorScheme: 'dark',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Curta, a CTF protocol',
    description: 'See our terms of our service and how they relate to you.',
    siteName: 'curta.wtf',
    url: 'https://curta.wtf',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@curta_ctf',
    siteId: '1604186457165406210',
    creator: '@waterfall_mkt',
    creatorId: '1466508083929223176',
  },
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function TermsOfService() {
  return (
    <ContainerLayout>
      <div className="prose prose-invert max-w-none">
        <h1>Terms of Service</h1>
        <p className="text-gray-200">Last Updated: February 8, 2023</p>

        <p>
          Curta is a decentralized marketplace for Capture the Flag (CTF) puzzles, where users can
          create, solve, and sell CTF puzzles to earn prizes or secure a place on the leaderboard.
          Curta is infinitely expandable, which allows for a wide range of puzzle types and formats.
          Solved CTF puzzles can be minted as Flag NFTs, and users may transact in them. These Terms
          of Service (“<strong>Terms</strong>”) govern your access to, and use of, Curta to make
          your experience even more enjoyable.
        </p>

        <h2>Welcome to Curta!</h2>
        <p>
          Welcome to Curta, operated by Telepu Inc. (collectively with Telepu’s successors and
          assigns, “<strong>Telepu</strong>,” or “<strong>us</strong>,” or “<strong>we</strong>
          ”). These Terms govern your access to and use of the Curta website(s), our APIs, mobile
          app (if any) and any other software, tools, features, or functionalities provided on or in
          connection with our services (collectively, the “<strong>Site</strong>”). For purposes of
          these Terms, “<strong>User</strong>
          ,” “<strong>you</strong>,” and “<strong>your</strong>” means individual, entity, group, or
          association who views, interacts, links to, or otherwise uses or derives any benefit from,
          the Site. If you use the Site on behalf of a company or other entity then “User” and “you”
          include you and that entity, and you represent and warrant that (a) you are an authorized
          representative of the entity with the authority to bind the entity to these Terms, and (b)
          you agree to these Terms on the entity’s behalf.
        </p>
        <p>
          These Terms constitute a binding legal agreement between you and us (and each of our
          successors and assigns). Please contact us at the address listed below under Contact
          Information for any questions or issues you may have with respect to these Terms.
        </p>
        <p>
          “<strong>NFT</strong>” in these Terms means a non-fungible token or similar digital item
          implemented on a blockchain (such as the Ethereum blockchain), which uses smart contracts
          to link to or otherwise be associated with certain content or data.
        </p>
        <p>
          THESE TERMS SET FORTH THE LEGALLY BINDING TERMS AND CONDITIONS THAT GOVERN YOUR USE OF THE
          SITE.{' '}
          <strong>
            BY ACCESSING OR USING THE SITE, YOU ARE ACCEPTING THESE TERMS (ON BEHALF OF YOURSELF OR
            THE ENTITY THAT YOU REPRESENT), AND YOU REPRESENT AND WARRANT THAT YOU HAVE THE RIGHT,
            AUTHORITY, AND CAPACITY TO ENTER INTO THESE TERMS (ON BEHALF OF YOURSELF OR THE ENTITY
            THAT YOU REPRESENT)
          </strong>
          . IF YOU DO NOT AGREE WITH ALL OF THE PROVISIONS OF THESE TERMS, DO NOT ACCESS OR USE THE
          SITE.
        </p>
        <p>
          THESE TERMS REQUIRE THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES,
          RATHER THAN JURY TRIALS OR CLASS ACTIONS, AND ALSO LIMIT THE REMEDIES AVAILABLE TO YOU IN
          THE EVENT OF A DISPUTE.
        </p>

        <h2>About the Site</h2>
        <p>
          The Site allows you to view, interact with, create, or otherwise manipulate information
          related to CTF puzzles and NFTs (for example, CTF puzzles and NFTs associated with the
          Ethereum blockchain), including, but not limited to, upload user created content in the
          form of CTF puzzles, unique NFTs, galleries, exhibitions, collections, registries, and
          other related display formats to our servers and the servers of third parties engaged by
          Telepu, existing CTF puzzles, NFTs, and related display formats, browse CTF puzzles, NFTs,
          and related display formats, list NFTs for sale, and transact with other Users in NFTs.
        </p>

        <h2>Our Role</h2>
        <p>
          We do not control or operate or bear any responsibility for any underlying blockchain,
          decentralized storage solution, or distributed ledger network associated with any content
          that Users may wish to showcase via the Site or associated with any CTF puzzles or NFTs
          displayed via the Site. Similarly, we cannot guarantee the functionality of CTF puzzles,
          unique NFTs, galleries, exhibitions, collections, registries, and other related display
          formats that are managed by third parties that we may work with.
        </p>
        <p>
          Our sole role is to facilitate interaction of the Users with the underlying blockchain,
          decentralized storage solution, or distributed ledger network. You should examine by
          yourself, either independently or together with the professional advisors, the quality,
          accuracy, and suitability of the Site for your needs and decide whether you should use
          and/or rely on the Site and any of the information on the Site.
        </p>
        <p>
          We are not a wallet provider, exchange, broker, financial institution, money services
          business, or creditor. We do not have custody or control over the NFTs, CTF puzzles, or
          blockchains you are interacting with, and we do not execute or effectuate purchases,
          transfers, or sales of NFTs. We do not have custody of, and does not control or manage in
          any way, the funds on the underlying blockchain or those of Users in even a transitory
          manner. To use our Site, you must use a third-party wallet which allows you to engage in
          transactions on blockchains.
        </p>
        <p>
          We are not a party to any agreement between any Users. You bear full responsibility for
          verifying the identity, legitimacy, and authenticity of NFTs that you purchase from
          third-party sellers using the Site and we make no claims about the identity, legitimacy,
          functionality, or authenticity of Users, NFTs, or CTF puzzles (and any content associated
          with such NFTs and CTF puzzles) visible on the Site.
        </p>
        <p>
          We do not make any representations or warranties about the third-party content visible
          through the Site, including any content associated with CTF puzzles or NFTs displayed on
          the Site.
        </p>
        <p>
          We are not acting as your financial, legal, or tax advisor and you must not regard us as
          acting in that capacity. You should consult your own independent professional advisors
          before entering into any transaction and enter into a transaction only if you fully
          understand its nature, the contractual relationship into which you are entering, all
          relevant terms and conditions, and the nature and extent of your exposure to loss.
        </p>

        <h2>Site Content</h2>
        <p>
          Given the nature of blockchain-based CTF puzzles and NFTs and the associated risks
          discussed in these Terms, we are unable to guarantee that any content intended to be
          displayed on the Site will necessarily display or otherwise be accessible via the Site as
          intended. Accordingly, we cannot be held liable if CTF puzzles, NFTs, galleries,
          exhibitions, collections, registries, and other related display formats cease to function,
          or otherwise never function, as intended due to errors that may occur on the underlying
          blockchain that the CTF puzzles, NFTs, galleries, exhibitions, collections, registries,
          and other related display formats depend upon, or errors with storage solutions for the
          artwork associated with the CTF puzzles, NFTs, galleries, exhibitions, collections,
          registries, and other related display formats. In particular, we cannot be held liable for
          errors related to decentralized storage solutions that may be employed by Users, us, and
          other third-party affiliates that may occur and result in the inability to access artwork
          associated with the CTF puzzles, NFTs, galleries, exhibitions, collections, registries,
          and other related display formats.
        </p>

        <h2>Accessing the Site</h2>
        <p>
          As part of your use of the Site we may require you to create an account. In doing so, you
          agree to voluntarily provide information needed for the account creation process and you
          agree that our handling of that information is governed by these Terms.
        </p>
        <p>
          Your usage of the Site may be associated with your blockchain address. By using your
          third-party wallet in connection with the Site, you agree that you are using that wallet
          under the terms and conditions of the applicable provider of the wallet. Wallets are not
          operated by, maintained by, or affiliated with us, and we do not have custody or control
          over the contents of your wallet and has no ability to retrieve or transfer its contents.
        </p>
        <p>
          You are responsible for anything that occurs when anyone is signed into your account, as
          well as the security of the account and your wallet.
        </p>
        <p>
          You can delete your account at any time by using the functionalities available on the
          Site.
        </p>
        <p>
          Your access and use of the Site may be interrupted from time to time for any of several
          reasons, including, without limitation, the malfunction of equipment, periodic updating,
          maintenance, or repair of the Site or other actions that we, in our sole discretion, may
          elect to take.
        </p>

        <h2>User Conduct</h2>
        <p>
          You are responsible for all activity on your account. If you violate these Terms and other
          Curta policies and guidelines, we may terminate your account and your access to the Site.
        </p>
        <p>
          We hereby grant you a limited, non-exclusive, non-transferable, revocable license to
          access and use the Site. Our grant of such license is subject to your compliance with all
          Curta policies and guidelines and the following conditions:
        </p>
        <ul>
          <li>
            Unlawful Activity: you agree not to engage, or assist, in any activity that violates any
            law, statute, ordinance, regulation, or sanctions program, including but not limited to
            the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC), or that
            involves proceeds of any unlawful activity.
          </li>
          <li>
            Abusive Activity: you agree not to engage in any activity that poses a threat to us or
            the Site, for example by distributing a virus or other harmful code, or through
            unauthorized access to the Site or other Users’ accounts.
          </li>
          <li>
            Inappropriate Behavior: you agree not to interfere with other Users’ access to or use of
            the Site.
          </li>
          <li>
            Communication: you agree not to communicate with other Users for purposes of (1) sending
            unsolicited advertising or promotions, in particular any communications relating to any
            proposed transaction which would be illegal under U.S. or other applicable law, requests
            for donations, or spam; (2) engaging in hate speech or harassing or abusing other Users;
            (3) interfering with transactions of other Users.
          </li>
          <li>
            Fraud: you agree not to engage in any activity which operates to defraud us, other
            Users, or any other person, including any activity on the Site engaged in to
            fraudulently induce any proposed transaction which would be illegal under U.S. or other
            applicable law; or to provide any false, inaccurate, or misleading information to us.
          </li>
          <li>
            Transactions: you agree not to engage in any transactions via the Site that result in
            the sale of NFTs or CTF puzzles which would be illegal under U.S. or other applicable
            law.{' '}
          </li>
          <li>
            Gambling: you agree not to utilize the Site to engage in any lottery, bidding fee
            auctions, contests, sweepstakes, or other games of chance.
          </li>
          <li>
            Taxes: we are not responsible for determining the withholding, sales, use, value added,
            transfer or other taxes, together with any interest and penalties imposed with respect
            thereto (the “<strong>Taxes</strong>”), that apply to your transactions. You agree that
            you are solely responsible for determining what, if any, Taxes apply to your
            transactions and to withhold, collect, report and remit the correct amounts of Taxes to
            the appropriate taxing authorities.
          </li>
          <li>
            Intellectual Property Infringement: you agree not to (1) engage in transactions
            involving items that infringe or violate any copyright, trademark, right of publicity or
            privacy or any other proprietary right under the law; (2) use Telepu’s content from the
            Site without express written permission from Telepu; or (3) engage in any action that
            implies an untrue endorsement or affiliation with Telepu.
          </li>
          <li>
            Hyperlinks: you are hereby granted a limited, non-exclusive, non-transferable, revocable
            license to create a text hyperlink to the Site provided that such link does not portray
            us, our affiliates, or the Site in a false, misleading, derogatory, or otherwise
            defamatory manner, and provided further that the linking site does not contain any
            illegal materials, or other materials that may be considered offensive, harassing, or
            otherwise objectionable.
          </li>
          <li>
            Other Prohibitions: You agree not to engage in any copying, modification, or otherwise
            appropriation of the Site or any material owned by us as part of your use of the Site
            without express written permission from Telepu for the proposed copying, modification,
            or appropriation of the Site or material.
          </li>
        </ul>
        <p>
          If you are unsure whether a contemplated use would violate these Terms, please contact us
          at the address listed below under Contact Information.
        </p>

        <h2>User Transactions</h2>
        <p>
          In some instances, we may provide services that enable Users to engage in transactions for
          NFTs. In these instances, we may receive certain fees in connection with such transactions
          that Users at their sole discretion initiate through the Site. Any transactions Users
          enter into through the Site are conducted and settled according to the rules embodied in
          certain ‘smart contracts’ deployed to the relevant blockchain. In no case, whatsoever, do
          we take possession of User funds nor do we guarantee that transactions will execute as
          intended, and we are not liable for transactions that do not execute as anticipated.
          Transactions for NFTs carry unique risks and you assume the risk associated with those
          transactions.
        </p>
        <p>
          Additionally, transactions in NFTs, or NFT related transactions, operate according to
          rulesets determined by the underlying blockchain, or distributed ledger, on which the NFT
          involved in the transaction exists. We cannot guarantee the functionality of any
          underlying blockchain, or distributed ledger, and in no way can be held responsible for
          failures that occur on the underlying blockchain due to, but not limited to, the following
          occurrences: network downtime, soft forks, hard forks, merges, DAO votes, 50%+1 attacks,
          double-spending instances or bugs, consensus failures, distributed denial of service
          attacks, key loss, key theft, wallet bugs, wallet code failure, and the like.
        </p>
        <p>
          From time to time, we may work with third parties to facilitate transactions that occur
          via the Site. We do not guarantee that third parties that we may work with will execute
          transactions as intended. Consequently, we are not responsible for the functionality of
          third party systems to facilitate said transactions.
        </p>
        <p>
          By engaging in the transactions related to NFTs and other digital assets, you confirm that
          you are able to bear the economic and other risks associated with such transactions. You
          understand that the value of NFTs and other digital assets can be zero at any time.
        </p>

        <h2>Intellectual Property Rights</h2>
        <p>
          The Site, including its design, information, all content and materials contained therein
          are the proprietary property of Telepu or our affiliates, licensors, or Users, as
          applicable, and you agree not to take any action(s) inconsistent with such ownership
          interests. We and our affiliates, licensors, and Users, as applicable, reserve all rights
          in connection with the Site and its content, including, without limitation, the exclusive
          right to create derivative works.
        </p>
        <p>
          In connection with your use of the Site, you may be able to create, submit, post, promote,
          upload, or display content through the Site, including content that is tied to CTF puzzles
          or NFTs (“<strong>Your Content</strong>”).
        </p>
        <p>
          You represent and warrant that you have, or have obtained, all rights, licenses, consents,
          permissions, power and/or authority necessary to grant the rights granted herein for Your
          Content. You represent and warrant that Your Content does not violate any laws and does
          not contain material subject to copyright, trademark, publicity rights, or other
          intellectual property rights, unless you have necessary permission or are otherwise
          legally entitled to post the material. We may ask you for additional information needed to
          verify compliance of Your Content with these Terms and Curta policies and guidelines.
        </p>

        <h2>License to Your Content</h2>
        <p>
          To operate, improve, and promote the Site, we need to have a right to perform certain
          operations with Your Content. Accordingly, by using the Site and uploading your content or
          otherwise making your content available on the Site, you grant us a license to access,
          use, host, cache, store, copy, reproduce, transmit, display, publish, distribute, adapt,
          prepare derivative works, and modify Your Content in any and all media or distribution
          methods, but solely as required for the effective operation, improvement and promotion of
          the Site (the “<strong>License to Your Content</strong>
          ”). You agree that this License to Your Content is non-exclusive, royalty-free,
          transferable, sub-licensable, worldwide, and irrevocable (for so long as your content is
          available on the Site) and provides us with the right to (i) transfer our rights under
          this License to Your Content to others with whom we have contractual relationship (as may
          be needed for the effective operation, improvement, and promotion of the Site), and (ii)
          otherwise permit access to, or disclose, Your Content to third parties if we determine
          that such access or disclosure is necessary to comply with our legal obligations.
        </p>
        <p>
          We may, in our sole discretion, remove Your Content or information you share on the Site
          if we believe that Your Content or such information violates these Terms or any of the
          Curta policies or guidelines, now in place or as instituted in the future.
        </p>

        <h2>Copyright Infringement Complaints Under the Digital Millennium Copyright Act</h2>
        <p>
          We respect the intellectual property rights of others. It is our policy to respond
          promptly to any claim that content posted on the Site infringes the copyright or other
          intellectual property rights of any person. We will use reasonable efforts to investigate
          notices of alleged infringement and will take appropriate action under the Digital
          Millennium Copyright Act (“<strong>DMCA</strong>”) and these Terms, including removing or
          disabling access to content claimed to be infringing and/or terminating accounts and
          access to the Site.
        </p>
        <h3>The DMCA Process and Procedure</h3>
        <p>
          The DMCA provides a process for a copyright owner to give notification to an online site
          provider concerning alleged copyright infringement. When an effective DMCA notification is
          received, the online site provider responds under this process by taking down the
          offending content. On taking down content under the DMCA, we will take reasonable steps to
          contact the User responsible for minting the removed content so that a
          counter-notification may be filed if applicable. On receiving a valid
          counter-notification, we generally restore the content in question, unless we receive
          notice from the DMCA notice provider that a legal action has been filed seeking a court
          order to restrain the alleged infringer from engaging in the infringing activity. Our
          policies do not protect any information contained in any DMCA take-down notice or
          counter-notification. If you have any questions about your rights, copyright infringement,
          or the notification and counter-notification process under the DMCA, we recommend that you
          speak with an attorney.
        </p>
        <h3>Filing a DMCA “Take Down” Notification</h3>
        <p>
          If you are a copyright owner or an agent thereof and believe that any content on the Site
          infringes upon your copyrights, you may submit a notification pursuant to the DMCA by
          providing us with the following information in writing (see 17 U.S.C. § 512 for further
          detail):
        </p>
        <ul>
          <li>
            A physical or electronic signature of a person authorized to act on behalf of the owner
            of an exclusive right that is allegedly infringed.
          </li>
          <li>
            Identification of the copyrighted work claimed to have been infringed, or, if multiple
            copyrighted works, a representative list of such works at that site.
          </li>
          <li>
            Identification of the material that is claimed to be infringing or to be the subject of
            infringing activity and that is to be removed or access to which is to be disabled, and
            information reasonably sufficient to permit us to locate the material. *Providing URLs
            in the body of your DMCA notification is the best way to help us locate content quickly
          </li>
          <li>
            Information reasonably sufficient to permit us to contact you (the complaining party),
            such as an address, telephone number, and an electronic mail address at which you (the
            complaining party) may be contacted.
          </li>
          <li>
            A statement that you (the complaining party) have a good faith belief that use of the
            material in the manner complained of is not authorized by the copyright owner, its
            agent, or the law.
          </li>
          <li>
            A statement that the information in the notification is accurate, and under penalty of
            perjury, that you (the complaining party) are authorized to act on behalf of the owner
            of an exclusive right that is allegedly infringed.
          </li>
          <li>
            **(Optional) Provide information, if possible, sufficient to permit us to notify the
            user(s) who posted the content that allegedly contains infringing material.
          </li>
        </ul>
        <p>
          Any person who knowingly materially misrepresents that information or an activity on the
          Site is infringing or that any material or activity was removed or disabled by mistake or
          misidentification, shall be liable to us and possibly others for any damages, including
          costs and attorneys’ fees incurred by us in removing or disabling access to the material
          or activity claimed to be infringing or in replacing the removed material or enabling
          access to it.
        </p>
        <h3>Responding to a DMCA Notice with a Counter-Notification</h3>
        <p>
          We will take reasonable steps to promptly inform you if your content has been taken down
          upon receipt of an effective DMCA infringement take-down notification. If you believe that
          the content that was removed or to which access was disabled is not infringing, or that
          you have the authorization from the copyright owner, the copyright owner’s agent, or
          pursuant to the law, to mint and use the material, you may send us a counter notification
          containing the following information:
        </p>
        <ul>
          <li>Your physical or electronic signature;</li>
          <li>
            Identification of the material that has been removed or to which access has been
            disabled and the location at which the material appeared before it was removed or
            disabled;
          </li>
          <li>
            A statement that you have a good faith belief that the material was removed or disabled
            as a result of mistake or a misidentification of the material; and
          </li>
          <li>
            Your name, address, telephone number, and e-mail address, a statement that you consent
            to the jurisdiction of the U.S. district court in the state in which you reside (or the
            U.S. district court where our headquarters are located if your address is outside of the
            United States), and a statement that you will accept the service of process from the
            person who provided notification of the alleged infringement to us.
          </li>
        </ul>
        <p>
          You have ten (10) business days after receipt of a DMCA take-down notice to send us an
          effective counter notification or the allegedly infringing material may not be restored.
        </p>
        <p>
          Any person who knowingly materially misrepresents that material or activity is infringing
          or that any material or activity was removed or disabled by mistake or misidentification,
          shall be liable to us for any damages, including costs and attorneys’ fees incurred by us
          in removing or disabling access to the material or activity claimed to be infringing or in
          replacing the removed material or enabling access to it.
        </p>
        <h3>Where to Send a DMCA Request</h3>
        <p>
          You must submit your DMCA take-down notices and counter notifications to us by email at
          the address listed below under Contact Information with the following subject/heading for
          the email: “Curta DMCA Take Down Notification.”
        </p>
        <h3>DMCA Notices Must Comply With These Requirements</h3>
        <p>
          Official DMCA notices must provide all the information described above in order to be
          effective. If your DMCA notice is ineffective, we may ignore it and have no obligation to
          remove the allegedly infringing content.
        </p>

        <h2>Disputes</h2>
        <p>
          Please read the following agreement to arbitrate (the “
          <strong>Arbitration Agreement</strong>”) in its entirety. This clause requires you to
          arbitrate disputes with us and limits the manner in which you can seek relief from us.
        </p>
        <p>
          You agree that any dispute or claim relating in any way to: your access, use, or attempted
          access or use of the Site; any products sold or distributed through the Site; or any
          aspect of your relationship with us will be resolved by binding arbitration, except that
          (1) you may assert claims in small claims court if your claims qualify; and (2) you or
          Telepu may seek equitable relief in court for infringement or other misuse of intellectual
          property rights (such as trademarks, trade dress, domain names, trade secrets, copyright,
          or patent). You agree that any such arbitration shall be settled solely and exclusively by
          binding arbitration held in New York, New York, administered by JAMS and conducted in
          English, rather than in court.
        </p>
        <p>
          Any such arbitration shall be conducted in accordance with the then-prevailing JAMS
          Streamlined Arbitration Rules and Procedures (available at https://www.jamsadr.com/),
          except that any dispute involving claims and counterclaims over $250,000, not inclusive of
          attorneys’ fees and interest, shall be subject to the then-prevailing JAMS Comprehensive
          Arbitration Rules and Procedures.
        </p>
        <p>
          The arbitrator shall have exclusive authority to (1) determine the scope and
          enforceability of this Arbitration Agreement; and (2) resolve any dispute related to the
          interpretation, applicability, enforceability or formation of this Arbitration Agreement,
          including but not limited to any claim that all or part of this Arbitration Agreement is
          void or voidable; (3) decide the rights and liabilities, if any, of you and Telepu; (4)
          grant motions dispositive of all or part of any claim; (5) award monetary damages and
          grant any non-monetary remedy or relief available to a party under applicable law,
          arbitration rules, these Terms (including the Arbitration Agreement) and Curta policies
          and guidelines. The arbitrator has the same authority to award relief on an individual
          basis that a judge in a court of law would have. The arbitrator shall issue a written
          award and statement of decision describing the essential findings and conclusions on which
          the award is based, including the calculation of any damages awarded. Such an award is
          final and binding upon you and us.
        </p>
        <p>
          You understand that by agreeing to this Arbitration Agreement, you and Telepu are each
          waiving their right to trial by jury and to participate in a class action or class
          arbitration.
        </p>
        <p>
          If any part of this Arbitration Agreement is found to be invalid or unenforceable, then
          such part shall be of no force and effect and shall be severed and the remainder of the
          Arbitration Agreement shall continue to be in full force and effect.
        </p>
        <p>
          This Arbitration Agreement shall survive the termination of your relationship with us.
        </p>

        <h2>Changes to these Terms</h2>
        <p>
          We may revise these Terms and other Curta policies and guidelines from time to time. If we
          make a change to these Terms or other Curta policies and guidelines that, in our sole
          discretion, is material, we will take steps to notify all Users by a notice on the Site.
          By continuing to access or use the Site after those changes become effective, you agree to
          be bound by the revised Terms, policies, and guidelines. It is your sole responsibility to
          review the Terms and other Curta policies and guidelines from time to time to view such
          changes and to ensure that you understand the terms and conditions that apply when you
          access or use the Site.
        </p>

        <h2>Disclaimers</h2>
        <p>
          YOUR ACCESS TO AND USE OF THE SITE IS AT YOUR OWN RISK. YOU UNDERSTAND AND AGREE THAT THE
          SITE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS AND TELEPU EXPRESSLY DISCLAIMS
          WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED. TELEPU (AND ITS
          SUPPLIERS) MAKE NO WARRANTY OR REPRESENTATION AND DISCLAIM ALL RESPONSIBILITY FOR WHETHER
          THE SITE: (A) WILL MEET YOUR REQUIREMENTS; (B) WILL BE AVAILABLE ON AN UNINTERRUPTED,
          TIMELY, SECURE, OR ERROR-FREE BASIS; OR (C) WILL BE ACCURATE, RELIABLE, COMPLETE, LEGAL,
          OR SAFE. TELEPU DISCLAIMS ALL OTHER WARRANTIES OR CONDITIONS, EXPRESS OR IMPLIED,
          INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. TELEPU WILL NOT BE LIABLE
          FOR ANY LOSS OF ANY KIND FROM ANY ACTION TAKEN IN RELIANCE ON MATERIAL OR INFORMATION,
          CONTAINED ON THE SITE. WHILE TELEPU ATTEMPTS TO MAKE YOUR ACCESS TO AND USE OF THE SITE
          SAFE, TELEPU CANNOT AND DOES NOT REPRESENT OR WARRANT THAT THE SITE, CONTENT, CONTENT
          LINKED TO OR ASSOCIATED WITH ANY NFTS OR CTF PUZZLES, OR ANY NFTS OR CTF PUZZLES YOU
          INTERACT WITH USING OUR SITE OR OUR SITE PROVIDERS’ SERVERS ARE FREE OF VIRUSES OR OTHER
          HARMFUL COMPONENTS. WE CANNOT GUARANTEE THE SECURITY OF ANY DATA THAT YOU DISCLOSE ONLINE.
          NO ADVICE OR INFORMATION, WHETHER ORAL OR OBTAINED FROM THE TELEPU PARTIES OR THROUGH THE
          SITE, WILL CREATE ANY WARRANTY OR REPRESENTATION NOT EXPRESSLY MADE HEREIN. YOU ACCEPT THE
          INHERENT SECURITY RISKS OF PROVIDING INFORMATION AND DEALING ONLINE OVER THE INTERNET AND
          WILL NOT HOLD TELEPU RESPONSIBLE FOR ANY BREACH OF SECURITY.
        </p>
        <p>
          WE WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSS AND TAKE NO RESPONSIBILITY FOR,
          AND WILL NOT BE LIABLE TO YOU FOR, ANY USE OF NFTS, CTF PUZZLES, ANY CONTENT, AND/OR
          CONTENT LINKED TO OR ASSOCIATED WITH NFTS AND CTF PUZZLES, INCLUDING BUT NOT LIMITED TO
          ANY LOSSES, DAMAGES, OR CLAIMS ARISING FROM: (A) USER ERROR, INCORRECTLY CONSTRUCTED
          TRANSACTIONS, OR MISTYPED ADDRESSES; (B) SERVER FAILURE OR DATA LOSS; (C) UNAUTHORIZED
          ACCESS OR USE; (D) ANY UNAUTHORIZED THIRD-PARTY ACTIVITIES, INCLUDING WITHOUT LIMITATION
          THE USE OF VIRUSES, PHISHING, BRUTEFORCING OR OTHER MEANS OF ATTACK AGAINST THE SITE, NFTS
          OR CTF PUZZLES.
        </p>
        <p>
          NFTS AND CTF PUZZLES EXIST ONLY BY VIRTUE OF THE OWNERSHIP RECORD MAINTAINED IN THE
          ASSOCIATED BLOCKCHAIN (E.G., ETHEREUM NETWORK). ANY TRANSFERS OR SALES OCCUR ON THE
          ASSOCIATED BLOCKCHAIN (E.G., ETHEREUM). TELEPU AND/OR ANY OTHER TELEPU PARTY CANNOT AFFECT
          OR OTHERWISE CONTROL THE TRANSFER OF TITLE OR RIGHT IN ANY CTF PUZZLES, NFTS OR UNDERLYING
          OR ASSOCIATED CONTENT OR ITEMS.
        </p>
        <p>
          TELEPU AND/OR ANY OTHER TELEPU PARTY DOES NOT MAKE ANY RECOMMENDATIONS WITH RESPECT TO THE
          VALUE OR FITNESS OF ANY PARTICULAR OF CTF PUZZLE, NFT, GALLERY, EXHIBITION, COLLECTION, OR
          REGISTRY THAT A USER MAY INTERACT WITH ON THE SITE.
        </p>
        <p>
          TELEPU AND/OR ANY OTHER TELEPU PARTY IS NOT RESPONSIBLE OR LIABLE FOR ANY SUSTAINED LOSSES
          OR INJURY DUE TO VULNERABILITY OR ANY KIND OF FAILURE, ABNORMAL BEHAVIOR OF SOFTWARE
          (E.G., WALLET, SMART CONTRACT), BLOCKCHAINS OR ANY OTHER FEATURES OF THE NFTS AND CTF
          PUZZLES. TELEPU AND/OR ANY OTHER TELEPU PARTY IS NOT RESPONSIBLE FOR LOSSES OR INJURY DUE
          TO LATE REPORTS BY DEVELOPERS OR REPRESENTATIVES (OR NO REPORT AT ALL) OF ANY ISSUES WITH
          THE BLOCKCHAIN SUPPORTING THE NFTS AND CTF PUZZLES, INCLUDING FORKS, TECHNICAL NODE ISSUES
          OR ANY OTHER ISSUES HAVING LOSSES OR INJURY AS A RESULT.
        </p>
        <p>
          Some jurisdictions do not allow the exclusion of implied warranties in contracts with
          consumers, so the above exclusion may not apply to you.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL TELEPU AND/OR ANY OTHER TELEPU
          PARTY BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFIT OR ANY INDIRECT,
          CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES ARISING FROM THESE
          TERMS, THE SITE, PRODUCTS OR THIRD PARTY SITES AND PRODUCTS, OR FOR ANY DAMAGES RELATED TO
          LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE,
          LOSS OF GOODWILL, OR LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE),
          BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE AND EVEN IF TELEPU AND/OR ANY OTHER
          TELEPU PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ACCESS TO, AND USE OF,
          THE SITES, PRODUCTS OR THIRD-PARTY SITES AND PRODUCTS ARE AT YOUR OWN DISCRETION AND RISK,
          AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR MOBILE DEVICE
          OR LOSS OF DATA RESULTING THEREFROM.
        </p>
        <p>
          NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, IN NO EVENT SHALL THE MAXIMUM
          AGGREGATE LIABILITY OF TELEPU AND/OR ANY OTHER TELEPU PARTY ARISING OUT OF OR IN ANY WAY
          RELATED TO THESE TERMS, THE ACCESS TO AND USE OF THE SITE, CONTENT, NFTS, CTF PUZZLES, OR
          ANY PRODUCTS OR SERVICES PURCHASED ON THE SITE EXCEED THE GREATER OF (A) $100 OR(B) THE
          AMOUNT YOU HAVE PAID TO TELEPU FOR THE SERVICES ON THE SITE IN THE LAST SIX MONTHS BEFORE
          THE LIABILITY AROSE. THE FOREGOING LIMITATIONS OF LIABILITY SHALL NOT APPLY TO LIABILITY
          OF TELEPU AND/OR ANY OTHER TELEPU PARTY FOR (A) WILLFUL MISCONDUCT, (B) DEATH OR PERSONAL
          INJURY CAUSED BY A MEMBER OF TELEPU’S NEGLIGENCE; OR FOR (B) ANY INJURY CAUSED BY A MEMBER
          OF TELEPU’S FRAUD OR FRAUDULENT MISREPRESENTATION.
        </p>
        <p>
          Some jurisdictions do not allow the exclusion or limitation of incidental or consequential
          damages, so the above limitation or exclusion may not apply to you. Some jurisdictions
          also limit disclaimers or limitations of liability for personal injury from consumer
          products, so this limitation may not apply to personal injury claims.
        </p>

        <h2>Indemnification</h2>
        <p>
          To the fullest extent permitted by applicable law, you agree to indemnify, defend and hold
          harmless Telepu, and our respective past, present and future employees, officers,
          directors, contractors, consultants, equity holders, suppliers, vendors, service
          providers, parent companies, subsidiaries, affiliates, agents, representatives,
          predecessors, successors and assigns (individually and collectively, the “
          <strong>Telepu Parties</strong>”), from and against all actual or alleged third party
          claims, damages, awards, judgments, losses, liabilities, obligations, penalties, interest,
          fees, expenses (including, without limitation, attorneys’ fees and expenses) and costs
          (including, without limitation, court costs, costs of settlement and costs of pursuing
          indemnification and insurance), of every kind and nature whatsoever, whether known or
          unknown, foreseen or unforeseen, matured or unmatured, or suspected or unsuspected, in law
          or equity, whether in tort, contract or otherwise (collectively, “<strong>Claims</strong>
          ”), including, but not limited to, damages to property or personal injury, that are caused
          by, arise out of or are related to (a) your use or misuse of the Site or anything posted
          on the Site (b) your violation of these Terms, (c) your violation of the rights of a third
          party, including another User, (d) any intellectual property disputes relating to Your
          Content or your CTF puzzles and NFTs sold via the Site; and (e) your failure to pay any
          Taxes in connection with your transactions. You agree to promptly notify Telepu Parties of
          any third-party Claims and cooperate with the Telepu Parties in defending such Claims. You
          further agree that the Telepu Parties shall have control of the defense or settlement of
          any third-party Claims. THIS INDEMNITY IS IN ADDITION TO, AND NOT IN LIEU OF, ANY OTHER
          INDEMNITIES SET FORTH IN AN APPLICABLE LAW OR A WRITTEN AGREEMENT BETWEEN YOU AND TELEPU.
        </p>

        <h2>No Investment Opportunity</h2>
        <p>
          NOTHING INCLUDED ON THE SITE CONSTITUTES AN OFFER OR SOLICITATION TO SELL OR DISTRIBUTE
          SECURITIES OR INVESTMENTS AND RELATED SERVICES TO ANYONE IN ANY JURISDICTION.
        </p>
        <p>
          THE REGULATORY ENVIRONMENT CONCERNING DIGITAL ASSETS AND BLOCKCHAIN TECHNOLOGY CONTINUES
          TO DEVELOP. THE APPLICATION AND INTERPRETATION OF EXISTING LAWS AND REGULATIONS ARE OFTEN
          LARGELY UNTESTED AND THERE IS A LACK OF CERTAINTY AS TO HOW THEY WILL BE APPLIED. NEW LAWS
          AND REGULATIONS WILL BE PROMULGATED IN THE FUTURE THAT APPLY TO BLOCKCHAIN TECHNOLOGY AND
          DIGITAL ASSETS, AND RELATED SERVICE PROVIDERS, AND NO ASSURANCE CAN BE GIVEN THAT ANY SUCH
          CHANGES WILL NOT ADVERSELY AFFECT DIGITAL ASSETS GENERALLY, NFTS, OR CTF PUZZLES. IT IS
          NOT POSSIBLE TO PREDICT HOW SUCH CHANGES WOULD AFFECT THE PRICE AND LIQUIDITY OF DIGITAL
          ASSETS GENERALLY, NFTS, AND CTF PUZZLES. WE MAY HAVE TO LIMIT THE AVAILABILITY OF CERTAIN
          NFTS, CTF PUZZLES, OR SERVICES OR DISALLOW USERS BASED ON THEIR CITIZENSHIP, RESIDENCE OR
          LOCATION FROM ENGAGING IN THE TRANSACTIONS OR ACCESSING THE SITE IF DOING SO BECOMES
          COMMERCIALLY UNSUSTAINABLE OR LEGALLY PROHIBITED.
        </p>
        <p>
          ANY NFTS OR CTF PUZZLES CREATED, DISPLAYED, UPLOADED, POSTED, OR PROMOTED ON THE SITE ARE
          NOT INTENDED TO CONSTITUTE SECURITIES AND/OR COLLECTIVE INVESTMENT UNITS. THE CONTENTS OF
          THE SITE SHOULD NOT BE USED AS A BASIS FOR MAKING INVESTMENT DECISIONS AND SHOULD NOT BE
          CONSTRUED AS AN ATTEMPT TO MARKET OR PROMOTE ANY TYPE OF SECURITY.
        </p>

        <h2>Governing Law and Venue</h2>
        <p>
          These Terms and your access to and use of the Site shall be governed by and construed and
          enforced in accordance with the laws of the State of Delaware (without regard to conflict
          of law rules or principles of the State of Delaware, or any other jurisdiction that would
          cause the application of the laws of any other jurisdiction). Any dispute between the
          parties that is not subject to arbitration as set forth above or cannot be heard in small
          claims court, shall be resolved in the state or federal courts of New York County in the
          State of New York, and the United States, respectively, sitting in the State of New York.
        </p>

        <h2>Termination</h2>
        <p>
          If you breach any of the provisions of these Terms, all licenses granted by us to you will
          terminate automatically. Additionally, notwithstanding anything contained in these Terms,
          we reserve the right, with or without notice and in our sole discretion, to suspend,
          disable, terminate, or delete your account and/or your ability to access or use the Site
          (or any part of the foregoing) at any time and for any or no reason, and you acknowledge
          and agree that we shall have no liability or obligation to you in such event and that you
          will not be entitled to a refund of any amounts that you have already paid to us.
        </p>

        <h2>Severability</h2>
        <p>
          If any term, clause, or provision of these Terms is held invalid or unenforceable, then
          that term, clause, or provision will be severable from these Terms and will not affect the
          validity or enforceability of any remaining part of that term, clause, or provision, or
          any other term, clause, or provision of these Terms.
        </p>

        <h2>Injunctive Relief</h2>
        <p>
          You agree that a breach of these Terms will cause irreparable injury to us for which
          monetary damages would not be an adequate remedy and we shall be entitled to equitable
          relief in addition to any remedies it may have hereunder or at law without a bond, other
          security, or proof of damages.
        </p>

        <h2>California Residents</h2>
        <p>
          If you are a California resident, in accordance with Cal. Civ. Code § 1789.3, you may
          report complaints to the Complaint Assistance Unit of the Division of Consumer SITEs of
          the California Department of Consumer Affairs by contacting them in writing at 1625 North
          Market Blvd., Suite N 112 Sacramento, CA 95834, or by telephone at (800) 952-5210.
        </p>

        <h2>Survival</h2>
        <p>
          All sections which by their nature should survive the termination of these Terms shall
          continue in full force and effect subsequent to and notwithstanding any termination of
          these Terms by us or you. Termination will not limit any of our other rights or remedies
          at law or in equity.
        </p>

        <h2>Miscallaneous</h2>
        <p>
          These Terms and other Curta policies and guidelines constitute the entire agreement
          between you and us relating to your access to and use of the Site. These Terms, and any
          rights and licenses granted hereunder, may not be transferred or assigned by you without
          our prior written consent, and our failure to assert any right or provision under these
          Terms shall not constitute a waiver of such right or provision. No waiver by either party
          of any breach or default hereunder shall be deemed to be a waiver of any preceding or
          subsequent breach or default. The section headings used herein are for reference only and
          shall not be read to have any legal effect.
        </p>
        <p>
          The Site is operated by us in the United States. Those who choose to access the Site from
          locations outside the United States do so at their own initiative and are responsible for
          compliance with applicable local laws. You and Telepu agree that the United Nations
          Convention on Contracts for the International Sale of Goods will not apply to the
          interpretation or construction of these Terms.
        </p>
        <p>
          Except as otherwise provided herein, these Terms are intended solely for the benefit of
          the parties and are not intended to confer third-party beneficiary rights upon any other
          person or entity.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions concerning these Terms, or you notice any bugs, errors or violations
          please feel free to send us an email at:{' '}
          <a className="text-primary" href="mailto:info@waterfall.market">
            info@waterfall.market
          </a>
          .
        </p>
      </div>
    </ContainerLayout>
  );
}
