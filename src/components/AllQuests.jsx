import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getQuests from "../modules/getQuests";
import QuestCard from "./QuestCard";
import { Grid } from "semantic-ui-react";

const AllQuests = () => {
  const dispatch = useDispatch();
  const quests = useSelector((state) => {
    return state.quests.quests;
  });

  useEffect(() => {
    getQuests(dispatch);
  }, []);

  const buildQuestCards = () => {
    const qCards = [];
    let i = 0;
    while (i < quests.length) {
      qCards.push(
        <Grid.Row style={{ padding: 0, margin: 5 }}>
          <Grid.Column
            width={3}
            style={{ padding: 0, marginLeft: 10, width: "fit-content" }}
          >
            <QuestCard quest={quests[i]} />
            <QuestCard quest={quests[i + 1]} />
            <QuestCard quest={quests[i + 2]} />
          </Grid.Column>
          <Grid.Column
            width={3}
            style={{ padding: 0, marginLeft: 10, width: "fit-content" }}
          >
            <QuestCard quest={quests[i + 3]} />
            <QuestCard quest={quests[i + 4]} />
            <QuestCard quest={quests[i + 5]} />
          </Grid.Column>
          <Grid.Column
            width={3}
            style={{ padding: 0, marginLeft: 10, width: "fit-content" }}
          >
            <QuestCard quest={quests[i + 6]} />
            <QuestCard quest={quests[i + 7]} />
            <QuestCard quest={quests[i + 8]} />
          </Grid.Column>
        </Grid.Row>
      );
      i += 9;
    }
    return qCards;
  };

  return (
    <div>
      <Grid
        id="qcards"
        fluid
        columns={3}
        divided
        centered
        style={{ marginTop: 100 }}
      >
        {buildQuestCards()}
      </Grid>
    </div>
  );
};

export default AllQuests;
