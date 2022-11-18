const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

//Graphqlのスキーマ言語を記述してスキーマを構築する
//スキーマはあくまでも定義のみで実際のデータ操作は行わない
const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);

//リゾルバ関数
//リゾルバ関数とは特定のフィールドのデータを返す関数であり、実際のデータ操作を行う部分
const root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6));
  }
};

//Expressでサーバーを構築
//graphql:trueとしたので、graphqlを利用できる
const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');