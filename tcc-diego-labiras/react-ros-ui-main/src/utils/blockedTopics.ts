export const blockedTopic = (topic: string) => {
  return (
    topic.includes("/client_count") ||
    topic.includes("/connected_clients") ||
    topic.includes("/parameter_events") ||
    topic.includes("/rosout") ||
    topic.includes("/turtle1/cmd_vel") ||
    topic.includes("/turtle1/color_sensor") ||
    topic.includes("/turtle1/pose")
  );
};
