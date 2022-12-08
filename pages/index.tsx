import useSWR from "swr";

import Head from "next/head";
import Layout, { siteTitle } from "../components/layout.js";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { fetcher } from "../lib/graphql-fetcher";

export default function Home({ allPostsData }) {
  const { data, error } = useSWR("{ users { name } }", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { users } = data;

  return (
    <Layout home>
      {users.map((user: any, i: number) => (
        <div key={i}>userName: {user.name}</div>
      ))}
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
