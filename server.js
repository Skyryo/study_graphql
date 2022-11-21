const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

//GraphQLの「スキーマを構築する
//スキーマに引数を指定する
const schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int!]
  }
`);

//リゾルバ関数
//リゾルバ関数とは特定のフィールドのデータを返す関数であり、実際のデータ操作を行う部分
const root = {
//クライアント側のクエリから引数を受け取る
  rollDice: ({numDice, numSides}) => {
    let output = [];
    for(var i= 0; i< numDice; i++){
      output.push(1 + Math.floor(Math.random()*(numSides || 6)));
    }
    return output;
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