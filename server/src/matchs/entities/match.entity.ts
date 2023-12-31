import { Field, ObjectType } from "type-graphql";

import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Player } from "../../players/entities/player.entity";
import { Role } from "../../users/entities/user.entity";

export enum Status {
  PENDING = "pending",
  PROGRESS = "progress",
  DONE = "done",
}

@Entity()
@ObjectType()
export class Match {
  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  @Field()
  id!: string;
  @Enum({ items: () => Status, default: Status.PENDING })
  @Field()
  status: Status = Status.PENDING;
  @Property()
  @Field()
  plannedDate: Date;
  @Property()
  @Field()
  createdAt: Date = new Date();

  @Field(() => [Player])
  @ManyToMany(() => Player, "matchs", { owner: true })
  players = new Collection<Player>(this);

  constructor(status: Status = Status.PENDING, plannedDate: Date) {
    this.status = status;
    this.plannedDate = plannedDate;
  }
}
