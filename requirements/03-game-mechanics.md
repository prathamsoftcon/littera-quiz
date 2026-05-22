# Game Mechanics Requirements

## Purpose

Create a gamified quiz experience based on a Snakes & Ladders model with dice-based movement, question answering, and speed plus accuracy scoring.

## Users

- Student

## Functional Requirements

- The game shall use a Snakes & Ladders board model.
- The system shall use dice rolls to determine attempted movement.
- A student shall answer a quiz question before movement is confirmed.
- Correct answers shall allow movement based on game rules.
- Incorrect answers shall prevent, reduce, or penalize movement according to configured rules.
- Snake and ladder positions shall affect player progression.
- Scoring shall consider answer accuracy.
- Scoring shall consider answer speed.
- The game shall display player position in real time.
- The game shall show current question, answer options, timer, score, and rank.
<!-- add feature:Pooja -->
- Question-tier tiles: easy/medium/hard tiles that change question difficulty and rewards.

## Acceptance Criteria

- A dice roll triggers a question.
- Correct answers update board position and score.
- Snake and ladder cells modify position correctly.
- Speed and accuracy are reflected in final score.
- The game state remains synchronized for all active players.

## Dependencies

- Question bank
- Real-time system
- Scoring engine
- Game configuration

