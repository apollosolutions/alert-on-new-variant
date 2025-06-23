import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * Implement the DateTime<Utc> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: { input: any; output: any; }
  /** A GraphQL document, such as the definition of an operation or schema. */
  GraphQLDocument: { input: any; output: any; }
  /** Long type */
  Long: { input: any; output: any; }
  /**
   * ISO 8601 combined date and time without timezone.
   *
   * # Examples
   *
   * * `2015-07-01T08:59:60.123`,
   */
  NaiveDateTime: { input: any; output: any; }
  /** A SHA-256 hash, represented as a lowercase hexadecimal string. */
  SHA256: { input: any; output: any; }
  /** ISO 8601, extended format with nanoseconds, Zulu (or "[+-]seconds" as a string or number relative to now) */
  Timestamp: { input: any; output: any; }
  /** Always null */
  Void: { input: any; output: any; }
};

/** An invitation for a user to join an organization. */
export type AccountInvitation = {
  __typename?: 'AccountInvitation';
  /** An accepted invitation cannot be used anymore */
  acceptedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** Who accepted the invitation */
  acceptedBy?: Maybe<User>;
  /** Time the invitation was created */
  createdAt: Scalars['Timestamp']['output'];
  /** Who created the invitation */
  createdBy?: Maybe<User>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Last time we sent an email for the invitation */
  lastSentAt?: Maybe<Scalars['Timestamp']['output']>;
  /** Access role for the invitee */
  role: UserPermission;
};

/** The membership association between a user and an organization. */
export type AccountMembership = {
  __typename?: 'AccountMembership';
  /** The timestamp when the user was added to the organization. */
  createdAt: Scalars['Timestamp']['output'];
  /** The user's role within the organization'. */
  role: UserPermission;
  /** The user that belongs to the organization. */
  user: User;
};

/** Represents an actor that performs actions in Apollo Studio. Most actors are either a `USER` or a `GRAPH` (based on a request's provided API key), and they have the corresponding `ActorType`. */
export type Actor = {
  __typename?: 'Actor';
  actorId: Scalars['ID']['output'];
  type: ActorType;
};

/** Input type to provide when specifying an `Actor` in operation arguments. See also the `Actor` object type. */
export type ActorInput = {
  actorId: Scalars['ID']['input'];
  type: ActorType;
};

export enum ActorType {
  AnonymousUser = 'ANONYMOUS_USER',
  Backfill = 'BACKFILL',
  Cron = 'CRON',
  Graph = 'GRAPH',
  InternalIdentity = 'INTERNAL_IDENTITY',
  Synchronization = 'SYNCHRONIZATION',
  System = 'SYSTEM',
  User = 'USER'
}

export type AddOperationCollectionEntriesResult = AddOperationCollectionEntriesSuccess | PermissionError | ValidationError;

export type AddOperationCollectionEntriesSuccess = {
  __typename?: 'AddOperationCollectionEntriesSuccess';
  operationCollectionEntries: Array<OperationCollectionEntry>;
};

export type AddOperationCollectionEntryResult = OperationCollectionEntry | PermissionError | ValidationError;

export type AddOperationInput = {
  /** The operation's fields. */
  document: OperationCollectionEntryStateInput;
  /** The operation's name. */
  name: Scalars['String']['input'];
};

/** Filter options available when searching affected queries for a check. */
export type AffectedQueriesFilterInput = {
  /** Filter by a keyword to match against the query's operation name or ID. */
  search?: InputMaybe<Scalars['String']['input']>;
  /**
   * Filter affected queries by one or more statuses.
   *
   * For example, use `[BROKEN]` to return only queries that are broken,
   * or `[BROKEN, POTENTIALLY_AFFECTED]` to include queries that are broken OR possibly affected.
   */
  status?: InputMaybe<Array<AffectedQueryStatus>>;
};

export type AffectedQuery = {
  __typename?: 'AffectedQuery';
  /** If the operation would be approved if the check ran again. Returns null if queried from SchemaDiff.changes.affectedQueries.alreadyApproved */
  alreadyApproved?: Maybe<Scalars['Boolean']['output']>;
  /** If the operation would be ignored if the check ran again */
  alreadyIgnored?: Maybe<Scalars['Boolean']['output']>;
  /** List of changes affecting this query. Returns null if queried from SchemaDiff.changes.affectedQueries.changes */
  changes?: Maybe<Array<ChangeOnOperation>>;
  /** Name to display to the user for the operation */
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** Determines if this query validates against the proposed schema */
  isValid?: Maybe<Scalars['Boolean']['output']>;
  /** Whether this operation was ignored and its severity was downgraded for that reason */
  markedAsIgnored?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the changes were marked as safe and its severity was downgraded for that reason */
  markedAsSafe?: Maybe<Scalars['Boolean']['output']>;
  /** Name provided for the operation, which can be empty string if it is an anonymous operation */
  name?: Maybe<Scalars['String']['output']>;
  /** First 128 characters of query signature for display */
  signature?: Maybe<Scalars['String']['output']>;
};

export enum AffectedQueryStatus {
  /** This query will break as a result of the changes in this check. */
  Broken = 'BROKEN',
  /** This query is affected by the changes, but was ignored in a previous check */
  Ignored = 'IGNORED',
  /** This query is valid but may be affected by the changes in this check. */
  PotentiallyAffected = 'POTENTIALLY_AFFECTED',
  /** This query is affected by the changes, but was marked as safe in a previous check. */
  Safe = 'SAFE'
}

/**
 * Represents an API key that's used to authenticate a
 * particular Apollo user or graph.
 */
export type ApiKey = {
  /** The API key's ID. */
  id: Scalars['ID']['output'];
  /** The API key's name, for distinguishing it from other keys. */
  keyName?: Maybe<Scalars['String']['output']>;
  /** The value of the API key. **This is a secret credential!** */
  token: Scalars['String']['output'];
};

export type ApiKeyProvision = {
  __typename?: 'ApiKeyProvision';
  apiKey: ApiKey;
  created: Scalars['Boolean']['output'];
};

export type AuditLogExport = {
  __typename?: 'AuditLogExport';
  /** The list of actors to filter the audit export */
  actors?: Maybe<Array<Identity>>;
  /** The time when the audit export was completed */
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** The time when the audit export was reqeusted */
  createdAt: Scalars['Timestamp']['output'];
  /** List of URLs to download the audits for the requested range */
  downloadUrls?: Maybe<Array<Scalars['String']['output']>>;
  /** The starting point of audits to include in export */
  from: Scalars['Timestamp']['output'];
  /** The list of graphs to filter the audit export */
  graphs?: Maybe<Array<Graph>>;
  /** The id for the audit export */
  id: Scalars['ID']['output'];
  /** The user that initiated the audit export */
  requester?: Maybe<User>;
  /** The status of the audit export */
  status: AuditStatus;
  /** The end point of audits to include in export */
  to: Scalars['Timestamp']['output'];
};

export enum AuditStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Queued = 'QUEUED'
}

/** The building of a Studio variant (including supergraph composition and any contract filtering) as part of a launch. */
export type Build = {
  __typename?: 'Build';
  /** The inputs provided to the build, including subgraph and contract details. */
  input: BuildInput;
  /** The result of the build. This value is null until the build completes. */
  result?: Maybe<BuildResult>;
};

/**
 * Exactly one of the inputs must be set in a build configuration.
 * Which build configuration type is set will determine the type
 * of variant that is created. Existing variants of a given type
 * cannot be updated in-place to be of a different type.
 */
export type BuildConfigInput = {
  /** This list will contain any directives that should get passed through to the api schema from the core schema. Anything included in this list will appear in the consumer facing schema */
  apiDirectivePassThrough: Array<Scalars['String']['input']>;
  /** if buildPipelineTrack is null use the graph default */
  buildPipelineTrack?: InputMaybe<BuildPipelineTrack>;
  composition?: InputMaybe<CompositionConfigInput>;
  contract?: InputMaybe<ContractConfigInput>;
};

/** A single error that occurred during the failed execution of a build. */
export type BuildError = {
  __typename?: 'BuildError';
  code?: Maybe<Scalars['String']['output']>;
  failedStep?: Maybe<Scalars['String']['output']>;
  locations: Array<SourceLocation>;
  message: Scalars['String']['output'];
};

/** Contains the details of an executed build that failed. */
export type BuildFailure = {
  __typename?: 'BuildFailure';
  errorCount: Scalars['Int']['output'];
  /** A list of all errors that occurred during the failed build. */
  errorMessages: Array<BuildError>;
};

export type BuildInput = CompositionBuildInput | FilterBuildInput;

export enum BuildPipelineTrack {
  Fed_1_0 = 'FED_1_0',
  Fed_1_1 = 'FED_1_1',
  Fed_2_0 = 'FED_2_0',
  Fed_2_1 = 'FED_2_1',
  Fed_2_3 = 'FED_2_3',
  Fed_2_4 = 'FED_2_4',
  Fed_2_5 = 'FED_2_5',
  Fed_2_6 = 'FED_2_6',
  Fed_2_7 = 'FED_2_7',
  Fed_2_8 = 'FED_2_8',
  Fed_2_9 = 'FED_2_9',
  Fed_2_10 = 'FED_2_10',
  Fed_2_11 = 'FED_2_11'
}

export type BuildResult = BuildFailure | BuildSuccess;

/** Contains the details of an executed build that succeeded. */
export type BuildSuccess = {
  __typename?: 'BuildSuccess';
  /** Contains the supergraph and API schemas created by composition. */
  coreSchema: CoreSchema;
};

/** The result of a failed call to PersistedQueryListMutation.delete due to linked variant(s). */
export type CannotDeleteLinkedPersistedQueryListError = Error & {
  __typename?: 'CannotDeleteLinkedPersistedQueryListError';
  message: Scalars['String']['output'];
};

export type CannotModifyOperationBodyError = Error & {
  __typename?: 'CannotModifyOperationBodyError';
  message: Scalars['String']['output'];
};

/** A single change that was made to a definition in a schema. */
export type Change = {
  __typename?: 'Change';
  affectedQueries?: Maybe<Array<AffectedQuery>>;
  /** Target arg of change made. */
  argNode?: Maybe<NamedIntrospectionArg>;
  /** Indication of the category of the change (e.g. addition, removal, edit). */
  category: ChangeCategory;
  /**
   * Node related to the top level node that was changed, such as a field in an object,
   * a value in an enum or the object of an interface.
   */
  childNode?: Maybe<NamedIntrospectionValue>;
  /** Indicates the type of change that was made, and to what (e.g., 'TYPE_REMOVED'). */
  code: Scalars['String']['output'];
  /** A human-readable description of the change. */
  description: Scalars['String']['output'];
  /** Top level node affected by the change. */
  parentNode?: Maybe<NamedIntrospectionType>;
  /** The severity of the change (e.g., `FAILURE` or `NOTICE`) */
  severity: ChangeSeverity;
  /** Short description of the change */
  shortDescription?: Maybe<Scalars['String']['output']>;
};

/**
 * Defines a set of categories that a schema change
 * can be grouped by.
 */
export enum ChangeCategory {
  Addition = 'ADDITION',
  Deprecation = 'DEPRECATION',
  Edit = 'EDIT',
  Removal = 'REMOVAL'
}

/**
 * These schema change codes represent all of the possible changes that can
 * occur during the schema diff algorithm.
 */
export enum ChangeCode {
  /** Type of the argument was changed. */
  ArgChangedType = 'ARG_CHANGED_TYPE',
  /** Argument was changed from nullable to non-nullable. */
  ArgChangedTypeOptionalToRequired = 'ARG_CHANGED_TYPE_OPTIONAL_TO_REQUIRED',
  /** Default value added or changed for the argument. */
  ArgDefaultValueChange = 'ARG_DEFAULT_VALUE_CHANGE',
  /** Description was added, removed, or updated for argument. */
  ArgDescriptionChange = 'ARG_DESCRIPTION_CHANGE',
  /** Argument to a field was removed. */
  ArgRemoved = 'ARG_REMOVED',
  /** Argument to the directive was removed. */
  DirectiveArgRemoved = 'DIRECTIVE_ARG_REMOVED',
  /** Location of the directive was removed. */
  DirectiveLocationRemoved = 'DIRECTIVE_LOCATION_REMOVED',
  /** Directive was removed. */
  DirectiveRemoved = 'DIRECTIVE_REMOVED',
  /** Repeatable flag was removed for directive. */
  DirectiveRepeatableRemoved = 'DIRECTIVE_REPEATABLE_REMOVED',
  /** Enum was deprecated. */
  EnumDeprecated = 'ENUM_DEPRECATED',
  /** Reason for enum deprecation changed. */
  EnumDeprecatedReasonChange = 'ENUM_DEPRECATED_REASON_CHANGE',
  /** Enum deprecation was removed. */
  EnumDeprecationRemoved = 'ENUM_DEPRECATION_REMOVED',
  /** Description was added, removed, or updated for enum value. */
  EnumValueDescriptionChange = 'ENUM_VALUE_DESCRIPTION_CHANGE',
  /** Field was added to the type. */
  FieldAdded = 'FIELD_ADDED',
  /** Return type for the field was changed. */
  FieldChangedType = 'FIELD_CHANGED_TYPE',
  /** Field was deprecated. */
  FieldDeprecated = 'FIELD_DEPRECATED',
  /** Reason for field deprecation changed. */
  FieldDeprecatedReasonChange = 'FIELD_DEPRECATED_REASON_CHANGE',
  /** Field deprecation removed. */
  FieldDeprecationRemoved = 'FIELD_DEPRECATION_REMOVED',
  /** Description was added, removed, or updated for field. */
  FieldDescriptionChange = 'FIELD_DESCRIPTION_CHANGE',
  /** Type of the field in the input object was changed. */
  FieldOnInputObjectChangedType = 'FIELD_ON_INPUT_OBJECT_CHANGED_TYPE',
  /** Field was removed from the type. */
  FieldRemoved = 'FIELD_REMOVED',
  /** Field was removed from the input object. */
  FieldRemovedFromInputObject = 'FIELD_REMOVED_FROM_INPUT_OBJECT',
  /** A default value was added to an input object field. */
  InputObjectFieldDefaultValueAdded = 'INPUT_OBJECT_FIELD_DEFAULT_VALUE_ADDED',
  /** The default value of an input object field was changed. */
  InputObjectFieldDefaultValueChange = 'INPUT_OBJECT_FIELD_DEFAULT_VALUE_CHANGE',
  /** The default value of an input object field was removed. */
  InputObjectFieldDefaultValueRemoved = 'INPUT_OBJECT_FIELD_DEFAULT_VALUE_REMOVED',
  /** Non-nullable field was added to the input object. (Deprecated.) */
  NonNullableFieldAddedToInputObject = 'NON_NULLABLE_FIELD_ADDED_TO_INPUT_OBJECT',
  /** Nullable field was added to the input type. (Deprecated.) */
  NullableFieldAddedToInputObject = 'NULLABLE_FIELD_ADDED_TO_INPUT_OBJECT',
  /** Nullable argument was added to the field. */
  OptionalArgAdded = 'OPTIONAL_ARG_ADDED',
  /** Optional field was added to the input type. */
  OptionalFieldAddedToInputObject = 'OPTIONAL_FIELD_ADDED_TO_INPUT_OBJECT',
  /** Non-nullable argument was added to the field. */
  RequiredArgAdded = 'REQUIRED_ARG_ADDED',
  /** Non-nullable argument added to directive. */
  RequiredDirectiveArgAdded = 'REQUIRED_DIRECTIVE_ARG_ADDED',
  /** Required field was added to the input object. */
  RequiredFieldAddedToInputObject = 'REQUIRED_FIELD_ADDED_TO_INPUT_OBJECT',
  /** Type was added to the schema. */
  TypeAdded = 'TYPE_ADDED',
  /** Type now implements the interface. */
  TypeAddedToInterface = 'TYPE_ADDED_TO_INTERFACE',
  /** A new value was added to the enum. */
  TypeAddedToUnion = 'TYPE_ADDED_TO_UNION',
  /**
   * Type was changed from one kind to another.
   * Ex: scalar to object or enum to union.
   */
  TypeChangedKind = 'TYPE_CHANGED_KIND',
  /** Description was added, removed, or updated for type. */
  TypeDescriptionChange = 'TYPE_DESCRIPTION_CHANGE',
  /** Type (object or scalar) was removed from the schema. */
  TypeRemoved = 'TYPE_REMOVED',
  /** Type no longer implements the interface. */
  TypeRemovedFromInterface = 'TYPE_REMOVED_FROM_INTERFACE',
  /** Type is no longer included in the union. */
  TypeRemovedFromUnion = 'TYPE_REMOVED_FROM_UNION',
  /** A new value was added to the enum. */
  ValueAddedToEnum = 'VALUE_ADDED_TO_ENUM',
  /** Value was removed from the enum. */
  ValueRemovedFromEnum = 'VALUE_REMOVED_FROM_ENUM'
}

/**
 * Represents the tuple of static information
 * about a particular kind of schema change.
 */
export type ChangeDefinition = {
  __typename?: 'ChangeDefinition';
  category: ChangeCategory;
  code: ChangeCode;
  defaultSeverity: ChangeSeverity;
};

/** Info about a change in the context of an operation it affects */
export type ChangeOnOperation = {
  __typename?: 'ChangeOnOperation';
  /** Human-readable explanation of the impact of this change on the operation */
  impact?: Maybe<Scalars['String']['output']>;
  /** The semantic info about this change, i.e. info about the change that doesn't depend on the operation */
  semanticChange: SemanticChange;
};

export enum ChangeSeverity {
  Failure = 'FAILURE',
  Notice = 'NOTICE'
}

/**
 * Summary of the changes for a schema diff, computed by placing the changes into categories and then
 * counting the size of each category. This categorization can be done in different ways, and
 * accordingly there are multiple fields here for each type of categorization.
 *
 * Note that if an object or interface field is added/removed, there won't be any addition/removal
 * changes generated for its arguments or @deprecated usages. If an enum type is added/removed, there
 * will be addition/removal changes generated for its values, but not for those values' @deprecated
 * usages. Description changes won't be generated for a schema element if that element (or an
 * ancestor) was added/removed.
 */
export type ChangeSummary = {
  __typename?: 'ChangeSummary';
  /** Counts for changes to fields of objects, input objects, and interfaces. */
  field: FieldChangeSummaryCounts;
  /** Counts for all changes. */
  total: TotalChangeSummaryCounts;
  /**
   * Counts for changes to non-field aspects of objects, input objects, and interfaces,
   * and all aspects of enums, unions, and scalars.
   */
  type: TypeChangeSummaryCounts;
};

export enum ChangeType {
  Failure = 'FAILURE',
  Notice = 'NOTICE'
}

/** An addition made to a Studio variant's changelog after a launch. */
export type ChangelogLaunchResult = {
  __typename?: 'ChangelogLaunchResult';
  createdAt: Scalars['Timestamp']['output'];
  schemaTagID: Scalars['ID']['output'];
};

/** Graph-level configuration of checks. */
export type CheckConfiguration = {
  __typename?: 'CheckConfiguration';
  /** Time when check configuration was created */
  createdAt: Scalars['Timestamp']['output'];
  /**
   * During operation checks, if this option is enabled, the check will not fail or
   * mark any operations as broken/changed if the default value has changed, only
   * if the default value is removed completely.
   */
  downgradeDefaultValueChange: Scalars['Boolean']['output'];
  /**
   * During operation checks, if this option is enabled, it evaluates a check
   * run against zero operations as a pass instead of a failure.
   */
  downgradeStaticChecks: Scalars['Boolean']['output'];
  enableCustomChecks: Scalars['Boolean']['output'];
  /** Whether to run Linting during schema checks. */
  enableLintChecks: Scalars['Boolean']['output'];
  /** Clients to ignore during validation */
  excludedClients: Array<ClientFilter>;
  /** Operation names to ignore during validation */
  excludedOperationNames?: Maybe<Array<Maybe<OperationNameFilter>>>;
  /** Operations to ignore during validation */
  excludedOperations: Array<ExcludedOperation>;
  /** Graph that this check configuration belongs to */
  graphID: Scalars['ID']['output'];
  /** ID of the check configuration */
  id: Scalars['ID']['output'];
  /** Default configuration to include operations on the base variant. */
  includeBaseVariant: Scalars['Boolean']['output'];
  /** Variant overrides for validation */
  includedVariants: Array<Scalars['String']['output']>;
  /** Minimum number of requests within the window for an operation to be considered. */
  operationCountThreshold: Scalars['Int']['output'];
  /**
   * Number of requests within the window for an operation to be considered, relative to
   * total request count. Expected values are between 0 and 0.05 (minimum 5% of
   * total request volume)
   */
  operationCountThresholdPercentage: Scalars['Float']['output'];
  /** How submitted build input diffs are handled when they match (or don't) a Proposal */
  proposalChangeMismatchSeverity: ProposalChangeMismatchSeverity;
  /**
   * Only check operations from the last <timeRangeSeconds> seconds.
   * The default is 7 days (604,800 seconds).
   */
  timeRangeSeconds: Scalars['Long']['output'];
  /** Time when check configuration was last updated */
  updatedAt: Scalars['Timestamp']['output'];
  /** Identity of the last user to update the check configuration */
  updatedBy?: Maybe<Identity>;
};

/** Filter options available when listing checks. */
export type CheckFilterInput = {
  /** A list of git commiters. For cli triggered checks, this is the author. */
  authors?: InputMaybe<Array<Scalars['String']['input']>>;
  branches?: InputMaybe<Array<Scalars['String']['input']>>;
  /** A list of actors triggering this check. For non cli triggered checks, this is the Studio User / author. */
  createdBy?: InputMaybe<Array<ActorInput>>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<CheckFilterInputStatusOption>;
  subgraphs?: InputMaybe<Array<Scalars['String']['input']>>;
  variants?: InputMaybe<Array<Scalars['String']['input']>>;
};

/**
 * Options for filtering CheckWorkflows by status
 * This should always match CheckWorkflowStatus
 */
export enum CheckFilterInputStatusOption {
  Failed = 'FAILED',
  Passed = 'PASSED',
  Pending = 'PENDING'
}

/** The result of performing a subgraph check, including all steps. */
export type CheckPartialSchemaResult = {
  __typename?: 'CheckPartialSchemaResult';
  /** Overall result of the check. This will be null if composition validation was unsuccessful. */
  checkSchemaResult?: Maybe<CheckSchemaResult>;
  /** Result of compostion run as part of the overall subgraph check. */
  compositionValidationResult: CompositionCheckResult;
  /** Whether any modifications were detected in the composed core schema. */
  coreSchemaModified: Scalars['Boolean']['output'];
};

/** The possible results of a request to initiate schema checks (either a success object or one of multiple `Error` objects). */
export type CheckRequestResult = CheckRequestSuccess | InvalidInputError | PermissionError | PlanError | RateLimitExceededError;

/** Represents a successfully initiated execution of schema checks. This does not indicate the _result_ of the checks, only that they were initiated. */
export type CheckRequestSuccess = {
  __typename?: 'CheckRequestSuccess';
  /** The URL of the Apollo Studio page for this check. */
  targetURL: Scalars['String']['output'];
  /** The unique ID for this execution of schema checks. */
  workflowID: Scalars['ID']['output'];
};

/** Input type to provide when running schema checks asynchronously for a non-federated graph. */
export type CheckSchemaAsyncInput = {
  /** Configuration options for the check execution. */
  config: HistoricQueryParametersInput;
  /** The GitHub context to associate with the check. */
  gitContext: GitContextInput;
  /** @deprecated This field is not required to be sent anymore */
  graphRef?: InputMaybe<Scalars['ID']['input']>;
  /** The URL of the GraphQL endpoint that Apollo Sandbox introspected to obtain the proposed schema. Required if `isSandbox` is `true`. */
  introspectionEndpoint?: InputMaybe<Scalars['String']['input']>;
  /** If `true`, the check was initiated automatically by a Proposal update. */
  isProposal?: InputMaybe<Scalars['Boolean']['input']>;
  /** If `true`, the check was initiated by Apollo Sandbox. */
  isSandbox: Scalars['Boolean']['input'];
  proposedSchemaDocument?: InputMaybe<Scalars['String']['input']>;
};

/** The result of running schema checks on a graph variant. */
export type CheckSchemaResult = {
  __typename?: 'CheckSchemaResult';
  /** The schema diff and affected operations generated by the schema check. */
  diffToPrevious: SchemaDiff;
  /** The URL to view the schema diff in Studio. */
  targetUrl?: Maybe<Scalars['String']['output']>;
};

export enum CheckStepStatus {
  Failure = 'FAILURE',
  Success = 'SUCCESS'
}

/** An individual diagnostic violation of a custom check task. */
export type CheckViolation = {
  __typename?: 'CheckViolation';
  /**
   * The schema coordinate of this rule violation as defined by RFC:
   * 		https://github.com/graphql/graphql-wg/blob/main/rfcs/SchemaCoordinates.md
   * 		Optional for violations that aren't specific to a single schema element
   */
  coordinate?: Maybe<Scalars['String']['output']>;
  /** The violation level for the rule. */
  level: ViolationLevel;
  /** A human-readable message describing the rule violation, rendered as markdown in Apollo Studio. Maximum length: 512 characters. */
  message: Scalars['String']['output'];
  /** The rule being violated. This is used to group multiple violations together in Studio. Max character length is 128. */
  rule: Scalars['String']['output'];
  /** The start and end position in the file of the rule violation. Used to display rule violations in the context of your schema diff. */
  sourceLocations?: Maybe<Array<FileLocation>>;
};

/** An individual diagnostic violation of a custom check task. */
export type CheckViolationInput = {
  /**
   * The schema coordinate of this rule violation as defined by RFC:
   * 		https://github.com/graphql/graphql-wg/blob/main/rfcs/SchemaCoordinates.md
   * 		Optional for violations that aren't specific to a single schema element
   */
  coordinate?: InputMaybe<Scalars['String']['input']>;
  /** The violation level for the rule. */
  level: ViolationLevel;
  /** A human-readable message describing the rule violation, rendered as markdown in Apollo Studio. Maximum length: 512 characters. */
  message: Scalars['String']['input'];
  /** The rule being violated. This is used to group multiple violations together in Studio. Max character length is 128. */
  rule: Scalars['String']['input'];
  /** The start and end position in the file of the rule violation. Used to display rule violations in the context of your schema diff. */
  sourceLocations?: InputMaybe<Array<FileLocationInput>>;
};

export type CheckWorkflow = {
  __typename?: 'CheckWorkflow';
  /**
   * The variant provided as a base to check against. Only the differences from the
   * base schema will be tested in operations checks.
   */
  baseVariant?: Maybe<GraphVariant>;
  /** The timestamp when the check workflow completed. */
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  /** Contextual parameters supplied by the runtime environment where the check was run. */
  gitContext?: Maybe<GitContext>;
  id: Scalars['ID']['output'];
  /** The name of the implementing service that was responsible for triggering the validation. */
  implementingServiceName?: Maybe<Scalars['String']['output']>;
  /** If this check was created by rerunning, the original check workflow that was rerun. */
  rerunOf?: Maybe<CheckWorkflow>;
  /** Checks created by re-running this check, most recent first. */
  reruns?: Maybe<Array<CheckWorkflow>>;
  /** The timestamp when the check workflow started. */
  startedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** Overall status of the workflow, based on the underlying task statuses. */
  status: CheckWorkflowStatus;
  /** The set of check tasks associated with this workflow, e.g. composition, operations, etc. */
  tasks: Array<CheckWorkflowTask>;
};


export type CheckWorkflowRerunsArgs = {
  limit?: Scalars['Int']['input'];
};

export enum CheckWorkflowStatus {
  Failed = 'FAILED',
  Passed = 'PASSED',
  Pending = 'PENDING'
}

export type CheckWorkflowTask = {
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  /**
   * The status of this task. All tasks start with the PENDING status while initializing. If any
   *  prerequisite task fails, then the task status becomes BLOCKED. Otherwise, if all prerequisite
   *  tasks pass, then this task runs (still having the PENDING status). Once the task completes, the
   *  task status will become either PASSED or FAILED.
   */
  status: CheckWorkflowTaskStatus;
  /** A studio UI url to view the details of this check workflow task */
  targetURL?: Maybe<Scalars['String']['output']>;
  /** The workflow that this task belongs to. */
  workflow: CheckWorkflow;
};

export enum CheckWorkflowTaskStatus {
  Blocked = 'BLOCKED',
  Failed = 'FAILED',
  Passed = 'PASSED',
  Pending = 'PENDING'
}

/** A client to be filtered. */
export type ClientFilter = {
  __typename?: 'ClientFilter';
  /** Name of the client is required. */
  name: Scalars['String']['output'];
  /** Version string of the client. */
  version?: Maybe<Scalars['String']['output']>;
};

/**
 * Options to filter by client reference ID, client name, and client version.
 * If passing client version, make sure to either provide a client reference ID or client name.
 */
export type ClientFilterInput = {
  /** name of the client set by the user and reported alongside metrics */
  name: Scalars['String']['input'];
  /** version of the client set by the user and reported alongside metrics */
  version?: InputMaybe<Scalars['String']['input']>;
};

/** Filter options to exclude by client reference ID, client name, and client version. */
export type ClientInfoFilter = {
  name: Scalars['String']['input'];
  /** Ignored */
  referenceID?: InputMaybe<Scalars['ID']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

/** Invalid input error */
export type CloudInvalidInputError = {
  __typename?: 'CloudInvalidInputError';
  /** Argument related to the error */
  argument: Scalars['String']['output'];
  /** Location of the error */
  location?: Maybe<Scalars['String']['output']>;
  /** Reason for the error */
  reason: Scalars['String']['output'];
};

/** Cloud Router tiers */
export enum CloudTier {
  /** Dedicated tier */
  Dedicated = 'DEDICATED',
  /** Enterprise Cloud tier */
  Enterprise = 'ENTERPRISE',
  /** Serverless tier */
  Serverless = 'SERVERLESS'
}

/** Validation result */
export type CloudValidationResult = CloudValidationSuccess | InternalServerError | InvalidInputErrors;

/** Config validation success */
export type CloudValidationSuccess = {
  __typename?: 'CloudValidationSuccess';
  message: Scalars['String']['output'];
};

export enum CommentStatus {
  Deleted = 'DELETED',
  Open = 'OPEN',
  Resolved = 'RESOLVED'
}

export type ComposeAndFilterPreviewBuildResults = {
  __typename?: 'ComposeAndFilterPreviewBuildResults';
  /** The API schema document/SDL generated from composition/filtering. */
  apiSchemaDocument: Scalars['String']['output'];
  /** The supergraph core schema document/SDL generated from composition/filtering. */
  supergraphSchemaDocument: Scalars['String']['output'];
};

export type ComposeAndFilterPreviewComposeError = {
  __typename?: 'ComposeAndFilterPreviewComposeError';
  /** A machine-readable error code. See https://www.apollographql.com/docs/federation/errors/for more info. */
  code?: Maybe<Scalars['String']['output']>;
  /** The step at which composition failed. */
  failedStep?: Maybe<Scalars['String']['output']>;
  /** Source locations related to the error. */
  locations?: Maybe<Array<SourceLocation>>;
  /** A human-readable message describing the error. */
  message: Scalars['String']['output'];
};

export type ComposeAndFilterPreviewComposeFailure = {
  __typename?: 'ComposeAndFilterPreviewComposeFailure';
  /** The list of errors from failed composition. */
  composeErrors: Array<ComposeAndFilterPreviewComposeError>;
};

export type ComposeAndFilterPreviewFilterError = {
  __typename?: 'ComposeAndFilterPreviewFilterError';
  /** The step at which filtering failed. See https://www.apollographql.com/docs/studio/contracts/#contract-errors for more info. */
  failedStep?: Maybe<Scalars['String']['output']>;
  /** A human-readable message describing the error. */
  message: Scalars['String']['output'];
};

export type ComposeAndFilterPreviewFilterFailure = {
  __typename?: 'ComposeAndFilterPreviewFilterFailure';
  /** The results from successful composition. */
  composeResults: ComposeAndFilterPreviewBuildResults;
  /** The list of errors from failed filtering. */
  filterErrors: Array<ComposeAndFilterPreviewFilterError>;
};

export type ComposeAndFilterPreviewResult = ComposeAndFilterPreviewComposeFailure | ComposeAndFilterPreviewFilterFailure | ComposeAndFilterPreviewSuccess;

export type ComposeAndFilterPreviewSubgraphChange = {
  /**
   * The info being changed in the named subgraph. If null, indicates that the named
   *  subgraph should be removed prior to composition.
   */
  info?: InputMaybe<ComposeAndFilterPreviewSubgraphChangeInfo>;
  /** The name of the subgraph being changed. */
  name: Scalars['String']['input'];
};

export type ComposeAndFilterPreviewSubgraphChangeInfo = {
  /**
   * The routing URL of the subgraph. If a subgraph with the same name exists, then this
   * field can be null to indicate the existing subgraph's info should be used; using
   * null otherwise results in an error.
   */
  routingUrl?: InputMaybe<Scalars['String']['input']>;
  /**
   * The schema document/SDL of the subgraph. If a subgraph with the same name exists,
   * then this field can be null to indicate the existing subgraph's info should be
   * used; using null otherwise results in an error.
   */
  schemaDocument?: InputMaybe<Scalars['String']['input']>;
};

export type ComposeAndFilterPreviewSuccess = {
  __typename?: 'ComposeAndFilterPreviewSuccess';
  /** The results from successful composition. */
  composeResults: ComposeAndFilterPreviewBuildResults;
  /** The results from successful filtering, or null if filtering was skipped. */
  filterResults?: Maybe<ComposeAndFilterPreviewBuildResults>;
};

export type CompositionBuildInput = {
  __typename?: 'CompositionBuildInput';
  subgraphs: Array<Subgraph>;
  version?: Maybe<Scalars['String']['output']>;
};

/** The result of composition validation run by Apollo Studio during a subgraph check. */
export type CompositionCheckResult = CompositionResult & {
  __typename?: 'CompositionCheckResult';
  /** A list of errors that occurred during composition. Errors mean that Apollo was unable to compose the graph variant's subgraphs into a supergraph schema. If any errors are present, gateways / routers are not updated. */
  errors: Array<SchemaCompositionError>;
  /** The unique ID for this instance of composition. */
  graphCompositionID: Scalars['ID']['output'];
  /** The supergraph schema document generated by composition. */
  supergraphSdl?: Maybe<Scalars['GraphQLDocument']['output']>;
};

export type CompositionCheckTask = CheckWorkflowTask & {
  __typename?: 'CompositionCheckTask';
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
  /**
   * Whether the build's output supergraph core schema differs from that of the active publish for
   * the workflow's variant at the time this field executed (NOT at the time the check workflow
   * started).
   */
  coreSchemaModified: Scalars['Boolean']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  /**
   * An old version of buildResult that returns a very old GraphQL type that generally should be
   * avoided. This field will soon be deprecated.
   */
  result?: Maybe<CompositionResult>;
  status: CheckWorkflowTaskStatus;
  targetURL?: Maybe<Scalars['String']['output']>;
  workflow: CheckWorkflow;
};

/** Composition configuration exposed to the gateway. */
export type CompositionConfig = {
  __typename?: 'CompositionConfig';
  /** The resulting API schema's SHA256 hash, represented as a hexadecimal string. */
  schemaHash: Scalars['String']['output'];
};

export type CompositionConfigInput = {
  subgraphs: Array<SubgraphInput>;
};

/** The result of supergraph composition that Studio performed. */
export type CompositionPublishResult = CompositionResult & {
  __typename?: 'CompositionPublishResult';
  /** A list of errors that occurred during composition. Errors mean that Apollo was unable to compose the graph variant's subgraphs into a supergraph schema. If any errors are present, gateways / routers are not updated. */
  errors: Array<SchemaCompositionError>;
  /** The unique ID for this instance of composition. */
  graphCompositionID: Scalars['ID']['output'];
  /** The supergraph SDL generated by composition. */
  supergraphSdl?: Maybe<Scalars['GraphQLDocument']['output']>;
};

/** The result of supergraph composition performed by Apollo Studio, often as the result of a subgraph check or subgraph publish. See individual implementations for more details. */
export type CompositionResult = {
  /** A list of errors that occurred during composition. Errors mean that Apollo was unable to compose the graph variant's subgraphs into a supergraph schema. If any errors are present, gateways / routers are not updated. */
  errors: Array<SchemaCompositionError>;
  /** The unique ID for this instance of composition. */
  graphCompositionID: Scalars['ID']['output'];
  /** Supergraph SDL generated by composition. */
  supergraphSdl?: Maybe<Scalars['GraphQLDocument']['output']>;
};

export type ContractConfigInput = {
  baseGraphRef: Scalars['String']['input'];
  filterConfigInput: FilterConfigInput;
};

export type ContractVariantUpsertErrors = {
  __typename?: 'ContractVariantUpsertErrors';
  /** A list of all errors that occurred when attempting to create or update a contract variant. */
  errorMessages: Array<Scalars['String']['output']>;
};

export type ContractVariantUpsertResult = ContractVariantUpsertErrors | ContractVariantUpsertSuccess;

export type ContractVariantUpsertSuccess = {
  __typename?: 'ContractVariantUpsertSuccess';
  /** The updated contract variant */
  contractVariant: GraphVariant;
  /** Human-readable text describing the launch result of the contract update. */
  launchCliCopy?: Maybe<Scalars['String']['output']>;
  /** The URL of the Studio page for this update's associated launch, if available. */
  launchUrl?: Maybe<Scalars['String']['output']>;
};

export type Coordinate = {
  __typename?: 'Coordinate';
  byteOffset: Scalars['Int']['output'];
  column: Scalars['Int']['output'];
  line: Scalars['Int']['output'];
};

/** Contains the supergraph and API schemas generated by composition. */
export type CoreSchema = {
  __typename?: 'CoreSchema';
  /** The composed API schema document. */
  apiDocument: Scalars['GraphQLDocument']['output'];
  /** The API schema document's SHA256 hash, represented as a hexadecimal string. */
  apiHash: Scalars['String']['output'];
  /** The composed supergraph schema document. */
  coreDocument: Scalars['GraphQLDocument']['output'];
  /** The supergraph schema document's SHA256 hash, represented as a hexadecimal string. */
  coreHash: Scalars['String']['output'];
};

export type CreateOperationCollectionResult = NotFoundError | OperationCollection | PermissionError | ValidationError;

/** The result of a successful call to GraphMutation.createPersistedQueryList. */
export type CreatePersistedQueryListResult = {
  __typename?: 'CreatePersistedQueryListResult';
  persistedQueryList: PersistedQueryList;
};

/** The result/error union returned by GraphMutation.createPersistedQueryList. */
export type CreatePersistedQueryListResultOrError = CreatePersistedQueryListResult | PermissionError;

/** An error that occurs when creating a proposal fails. */
export type CreateProposalError = Error & {
  __typename?: 'CreateProposalError';
  /** The error's details. */
  message: Scalars['String']['output'];
};

export type CreateProposalInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  sourceVariantName: Scalars['String']['input'];
};

export type CreateProposalResult = CreateProposalError | GraphVariant | PermissionError | ValidationError;

export type CustomCheckCallbackInput = {
  /** Sets the status of your check task. Setting this status to FAILURE will cause the entire check workflow to fail. */
  status: CheckStepStatus;
  /** The ID of the custom check task, provided in the webhook payload. */
  taskId: Scalars['ID']['input'];
  /** The violations found by your check task. Max length is 1000 */
  violations?: InputMaybe<Array<CheckViolationInput>>;
  /** The ID of the workflow that the custom check task is a member of, provided in the webhook payload. */
  workflowId: Scalars['ID']['input'];
};

/** Result of a custom check task callback mutation. */
export type CustomCheckCallbackResult = CustomCheckResult | PermissionError | TaskError | ValidationError;

/** Custom check configuration detailing webhook integration. */
export type CustomCheckConfiguration = {
  __typename?: 'CustomCheckConfiguration';
  channel: CustomCheckWebhookChannel;
  id: Scalars['ID']['output'];
};

/** Result of a custom check configuration update mutation. */
export type CustomCheckConfigurationResult = CustomCheckConfiguration | PermissionError | ValidationError;

export type CustomCheckResult = {
  __typename?: 'CustomCheckResult';
  violations: Array<CheckViolation>;
};

export type CustomCheckTask = CheckWorkflowTask & {
  __typename?: 'CustomCheckTask';
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  graphID: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  result?: Maybe<CustomCheckResult>;
  status: CheckWorkflowTaskStatus;
  targetURL?: Maybe<Scalars['String']['output']>;
  workflow: CheckWorkflow;
};

/** Configuration of a webhook integration for a custom check. */
export type CustomCheckWebhookChannel = {
  __typename?: 'CustomCheckWebhookChannel';
  /** The time when this CustomCheckWebhookChannel was created. */
  createdAt: Scalars['Timestamp']['output'];
  /** The Identity that created this CustomCheckWebhookChannel. null if the Identity has been deleted. */
  createdBy?: Maybe<Identity>;
  /** The ID for this webhook channel */
  id: Scalars['ID']['output'];
  /** The last time this subscription was updated, if never updated will be the createdAt time. */
  lastUpdatedAt: Scalars['Timestamp']['output'];
  /** The Identity that last updated this CustomCheckWebhookChannel, or the creator if no one has updated. null if the Identity has been deleted. */
  lastUpdatedBy?: Maybe<Identity>;
  /** Whether or not a secret token has been set on this channel. */
  secretTokenIsSet: Scalars['Boolean']['output'];
  /** The URL to send the webhook to. */
  url: Scalars['String']['output'];
  /** The variant name if this channel is only configured for a specific variant. If null, this configuration applies to all variants. */
  variant?: Maybe<Scalars['String']['output']>;
};

export type DeleteOperationCollectionResult = DeleteOperationCollectionSuccess | PermissionError;

export type DeleteOperationCollectionSuccess = {
  __typename?: 'DeleteOperationCollectionSuccess';
  sandboxOwner?: Maybe<User>;
  variants: Array<GraphVariant>;
};

/** The result of a successful call to PersistedQueryListMutation.delete. */
export type DeletePersistedQueryListResult = {
  __typename?: 'DeletePersistedQueryListResult';
  graph: Graph;
};

/** The result/error union returned by PersistedQueryListMutation.delete. */
export type DeletePersistedQueryListResultOrError = CannotDeleteLinkedPersistedQueryListError | DeletePersistedQueryListResult | PermissionError;

/** The result of a schema checks workflow that was run on a downstream variant as part of checks for the corresponding source variant. Most commonly, these downstream checks are [contract checks](https://www.apollographql.com/docs/studio/contracts#contract-checks). */
export type DownstreamCheckResult = {
  __typename?: 'DownstreamCheckResult';
  /** Whether the downstream check workflow blocks the upstream check workflow from completing. */
  blocking: Scalars['Boolean']['output'];
  /** The ID of the graph that the downstream variant belongs to. */
  downstreamGraphID: Scalars['String']['output'];
  /** The name of the downstream variant. */
  downstreamVariantName: Scalars['String']['output'];
  /**
   * The downstream checks workflow that this result corresponds to. This value is null
   * if the workflow hasn't been initialized yet, or if the downstream variant was deleted.
   */
  downstreamWorkflow?: Maybe<CheckWorkflow>;
  /**
   * Whether the downstream check workflow is causing the upstream check workflow to fail. This occurs
   * when the downstream check workflow is both blocking and failing. This may be null while the
   * downstream check workflow is pending.
   */
  failsUpstreamWorkflow?: Maybe<Scalars['Boolean']['output']>;
  /** The downstream checks task that this result corresponds to. */
  workflowTask: DownstreamCheckTask;
};

export type DownstreamCheckTask = CheckWorkflowTask & {
  __typename?: 'DownstreamCheckTask';
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  /**
   * A list of results for all downstream checks triggered as part of the source variant's checks workflow.
   * This value is null if the task hasn't been initialized yet, or if the build task fails (the build task is a
   * prerequisite to this task). This value is _not_ null _while_ the task is running. The returned list is empty
   * if the source variant has no downstream variants.
   */
  results?: Maybe<Array<DownstreamCheckResult>>;
  status: CheckWorkflowTaskStatus;
  targetURL?: Maybe<Scalars['String']['output']>;
  workflow: CheckWorkflow;
};

export enum DownstreamLaunchInitiation {
  /**
   * Initiate the creation of downstream launches associated with this subgraph publication asynchronously.
   * The resulting API response may not provide specific details about triggered downstream launches.
   */
  Async = 'ASYNC',
  /**
   * Initiate the creation of downstream Launches associated with this subgraph publication synchronously.
   * Use this option to ensure that any downstream launches will be started before the publish mutation returns.
   * Note that this does not require launches to complete, but it does ensure that the downstream launch IDs are
   * available to be queried from a `CompositionAndUpsertResult`.
   */
  Sync = 'SYNC'
}

/** GraphQL Error */
export type Error = {
  message: Scalars['String']['output'];
};

/** Excluded operation for a graph. */
export type ExcludedOperation = {
  __typename?: 'ExcludedOperation';
  /** Operation ID to exclude from schema check. */
  ID: Scalars['ID']['output'];
};

/** Option to filter by operation ID. */
export type ExcludedOperationInput = {
  /** Operation ID to exclude from schema check. */
  ID: Scalars['ID']['input'];
};

/** Counts of changes at the field level, including objects, interfaces, and input fields. */
export type FieldChangeSummaryCounts = {
  __typename?: 'FieldChangeSummaryCounts';
  /** Number of changes that are additions of fields to object, interface, and input types. */
  additions: Scalars['Int']['output'];
  /**
   * Number of changes that are field edits. This includes fields changing type and any field
   * deprecation and description changes, but also includes any argument changes and any input object
   * field changes.
   */
  edits: Scalars['Int']['output'];
  /** Number of changes that are removals of fields from object, interface, and input types. */
  removals: Scalars['Int']['output'];
};

export type FileCoordinate = {
  __typename?: 'FileCoordinate';
  byteOffset: Scalars['Int']['output'];
  column: Scalars['Int']['output'];
  line: Scalars['Int']['output'];
};

export type FileCoordinateInput = {
  byteOffset: Scalars['Int']['input'];
  column: Scalars['Int']['input'];
  line: Scalars['Int']['input'];
};

export type FileLocation = {
  __typename?: 'FileLocation';
  end: FileCoordinate;
  start: FileCoordinate;
  subgraphName?: Maybe<Scalars['String']['output']>;
};

export type FileLocationInput = {
  end: FileCoordinateInput;
  start: FileCoordinateInput;
  subgraphName?: InputMaybe<Scalars['String']['input']>;
};

/** Inputs provided to the build for a contract variant, which filters types and fields from a source variant's schema. */
export type FilterBuildInput = {
  __typename?: 'FilterBuildInput';
  /** Schema filtering rules for the build, such as tags to include or exclude from the source variant schema. */
  filterConfig: FilterConfig;
  /** The source variant schema document's SHA256 hash, represented as a hexadecimal string. */
  schemaHash: Scalars['String']['output'];
};

export type FilterCheckTask = CheckWorkflowTask & {
  __typename?: 'FilterCheckTask';
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  status: CheckWorkflowTaskStatus;
  targetURL?: Maybe<Scalars['String']['output']>;
  workflow: CheckWorkflow;
};

/** The filter configuration used to build a contract schema. The configuration consists of lists of tags for schema elements to include or exclude in the resulting schema. */
export type FilterConfig = {
  __typename?: 'FilterConfig';
  /** Tags of schema elements to exclude from the contract schema. */
  exclude: Array<Scalars['String']['output']>;
  /** Tags of schema elements to include in the contract schema. */
  include: Array<Scalars['String']['output']>;
};

export type FilterConfigInput = {
  /** A list of tags for schema elements to exclude from the resulting contract schema. */
  exclude: Array<Scalars['String']['input']>;
  /**
   * Whether to hide unreachable objects, interfaces, unions, inputs, enums and scalars from
   * the resulting contract schema. Defaults to `false`.
   */
  hideUnreachableTypes?: Scalars['Boolean']['input'];
  /** A list of tags for schema elements to include in the resulting contract schema. */
  include: Array<Scalars['String']['input']>;
};

/** Represents a diff between two versions of a schema as a flat list of changes */
export type FlatDiff = {
  __typename?: 'FlatDiff';
  diff: Array<FlatDiffItem>;
  id: Scalars['ID']['output'];
  summary: FlatDiffSummary;
};

export type FlatDiffAddArgument = FlatDiffItem & FlatDiffItemCoordinate & FlatDiffItemValue & {
  __typename?: 'FlatDiffAddArgument';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffAddDirective = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffAddDirective';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffAddDirectiveUsage = FlatDiffItem & FlatDiffItemCoordinate & FlatDiffItemValue & {
  __typename?: 'FlatDiffAddDirectiveUsage';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffAddEnum = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffAddEnum';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffAddEnumValue = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffAddEnumValue';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffAddField = FlatDiffItem & FlatDiffItemCoordinate & FlatDiffItemValue & {
  __typename?: 'FlatDiffAddField';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffAddImplementation = FlatDiffItem & FlatDiffItemCoordinate & FlatDiffItemValue & {
  __typename?: 'FlatDiffAddImplementation';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffAddInput = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffAddInput';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffAddInterface = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffAddInterface';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffAddObject = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffAddObject';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffAddScalar = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffAddScalar';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffAddSchemaDefinition = FlatDiffItem & {
  __typename?: 'FlatDiffAddSchemaDefinition';
  type: FlatDiffType;
};

export type FlatDiffAddSchemaDirectiveUsage = FlatDiffItem & FlatDiffItemValue & {
  __typename?: 'FlatDiffAddSchemaDirectiveUsage';
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffAddSchemaRootOperation = FlatDiffItem & FlatDiffItemRootType & FlatDiffItemValue & {
  __typename?: 'FlatDiffAddSchemaRootOperation';
  rootType: Scalars['String']['output'];
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffAddUnion = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffAddUnion';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffAddUnionMember = FlatDiffItem & FlatDiffItemCoordinate & FlatDiffItemValue & {
  __typename?: 'FlatDiffAddUnionMember';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffAddValidLocation = FlatDiffItem & FlatDiffItemCoordinate & FlatDiffItemValue & {
  __typename?: 'FlatDiffAddValidLocation';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffChangeArgumentDefault = FlatDiffItem & FlatDiffItemCoordinate & FlatDiffItemNullableValue & {
  __typename?: 'FlatDiffChangeArgumentDefault';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value?: Maybe<Scalars['String']['output']>;
};

export type FlatDiffChangeDescription = FlatDiffItem & FlatDiffItemCoordinate & FlatDiffItemNullableValue & {
  __typename?: 'FlatDiffChangeDescription';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value?: Maybe<Scalars['String']['output']>;
};

export type FlatDiffChangeDirectiveRepeatable = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffChangeDirectiveRepeatable';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value: Scalars['Boolean']['output'];
};

export type FlatDiffChangeInputFieldDefault = FlatDiffItem & FlatDiffItemCoordinate & FlatDiffItemNullableValue & {
  __typename?: 'FlatDiffChangeInputFieldDefault';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value?: Maybe<Scalars['String']['output']>;
};

export type FlatDiffChangeSchemaDescription = FlatDiffItem & FlatDiffItemNullableValue & {
  __typename?: 'FlatDiffChangeSchemaDescription';
  type: FlatDiffType;
  value?: Maybe<Scalars['String']['output']>;
};

export type FlatDiffItem = {
  type: FlatDiffType;
};

export type FlatDiffItemCoordinate = {
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffItemNullableValue = {
  type: FlatDiffType;
  value?: Maybe<Scalars['String']['output']>;
};

export type FlatDiffItemRootType = {
  rootType: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffItemValue = {
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffRemoveArgument = FlatDiffItem & FlatDiffItemCoordinate & FlatDiffItemValue & {
  __typename?: 'FlatDiffRemoveArgument';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffRemoveDirective = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffRemoveDirective';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffRemoveDirectiveUsage = FlatDiffItem & FlatDiffItemCoordinate & FlatDiffItemValue & {
  __typename?: 'FlatDiffRemoveDirectiveUsage';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffRemoveEnum = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffRemoveEnum';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffRemoveEnumValue = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffRemoveEnumValue';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffRemoveField = FlatDiffItem & FlatDiffItemCoordinate & FlatDiffItemValue & {
  __typename?: 'FlatDiffRemoveField';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffRemoveImplementation = FlatDiffItem & FlatDiffItemCoordinate & FlatDiffItemValue & {
  __typename?: 'FlatDiffRemoveImplementation';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffRemoveInput = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffRemoveInput';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffRemoveInterface = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffRemoveInterface';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffRemoveObject = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffRemoveObject';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffRemoveScalar = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffRemoveScalar';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffRemoveSchemaDefinition = FlatDiffItem & {
  __typename?: 'FlatDiffRemoveSchemaDefinition';
  type: FlatDiffType;
};

export type FlatDiffRemoveSchemaDirectiveUsage = FlatDiffItem & FlatDiffItemValue & {
  __typename?: 'FlatDiffRemoveSchemaDirectiveUsage';
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffRemoveSchemaRootOperation = FlatDiffItem & FlatDiffItemRootType & {
  __typename?: 'FlatDiffRemoveSchemaRootOperation';
  rootType: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffRemoveUnion = FlatDiffItem & FlatDiffItemCoordinate & {
  __typename?: 'FlatDiffRemoveUnion';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
};

export type FlatDiffRemoveUnionMember = FlatDiffItem & FlatDiffItemCoordinate & FlatDiffItemValue & {
  __typename?: 'FlatDiffRemoveUnionMember';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffRemoveValidLocation = FlatDiffItem & FlatDiffItemCoordinate & FlatDiffItemValue & {
  __typename?: 'FlatDiffRemoveValidLocation';
  coordinate: Scalars['String']['output'];
  type: FlatDiffType;
  value: Scalars['String']['output'];
};

export type FlatDiffResult = FlatDiff | NotFoundError;

/** Represents a summary of a diff between two versions of a schema. */
export type FlatDiffSummary = {
  __typename?: 'FlatDiffSummary';
  directive: FlatDiffTypeSummary;
  enum: FlatDiffTypeSummary;
  input: FlatDiffTypeSummary;
  interface: FlatDiffTypeSummary;
  object: FlatDiffTypeSummary;
  scalar: FlatDiffTypeSummary;
  schema: FlatDiffTypeSummary;
  union: FlatDiffTypeSummary;
};

export enum FlatDiffType {
  AddArgument = 'ADD_ARGUMENT',
  AddDirective = 'ADD_DIRECTIVE',
  AddDirectiveUsage = 'ADD_DIRECTIVE_USAGE',
  AddEnum = 'ADD_ENUM',
  AddEnumValue = 'ADD_ENUM_VALUE',
  AddField = 'ADD_FIELD',
  AddImplementation = 'ADD_IMPLEMENTATION',
  AddInput = 'ADD_INPUT',
  AddInterface = 'ADD_INTERFACE',
  AddObject = 'ADD_OBJECT',
  AddScalar = 'ADD_SCALAR',
  AddSchemaDefinition = 'ADD_SCHEMA_DEFINITION',
  AddSchemaDirectiveUsage = 'ADD_SCHEMA_DIRECTIVE_USAGE',
  AddSchemaRootOperation = 'ADD_SCHEMA_ROOT_OPERATION',
  AddUnion = 'ADD_UNION',
  AddUnionMember = 'ADD_UNION_MEMBER',
  AddValidLocation = 'ADD_VALID_LOCATION',
  ChangeArgumentDefault = 'CHANGE_ARGUMENT_DEFAULT',
  ChangeDescription = 'CHANGE_DESCRIPTION',
  ChangeInputFieldDefault = 'CHANGE_INPUT_FIELD_DEFAULT',
  ChangeRepeatable = 'CHANGE_REPEATABLE',
  ChangeSchemaDescription = 'CHANGE_SCHEMA_DESCRIPTION',
  RemoveArgument = 'REMOVE_ARGUMENT',
  RemoveDirective = 'REMOVE_DIRECTIVE',
  RemoveDirectiveUsage = 'REMOVE_DIRECTIVE_USAGE',
  RemoveEnum = 'REMOVE_ENUM',
  RemoveEnumValue = 'REMOVE_ENUM_VALUE',
  RemoveField = 'REMOVE_FIELD',
  RemoveImplementation = 'REMOVE_IMPLEMENTATION',
  RemoveInput = 'REMOVE_INPUT',
  RemoveInterface = 'REMOVE_INTERFACE',
  RemoveObject = 'REMOVE_OBJECT',
  RemoveScalar = 'REMOVE_SCALAR',
  RemoveSchemaDefinition = 'REMOVE_SCHEMA_DEFINITION',
  RemoveSchemaDirectiveUsage = 'REMOVE_SCHEMA_DIRECTIVE_USAGE',
  RemoveSchemaRootOperation = 'REMOVE_SCHEMA_ROOT_OPERATION',
  RemoveUnion = 'REMOVE_UNION',
  RemoveUnionMember = 'REMOVE_UNION_MEMBER',
  RemoveValidLocation = 'REMOVE_VALID_LOCATION'
}

export type FlatDiffTypeSummary = {
  __typename?: 'FlatDiffTypeSummary';
  add: Scalars['Int']['output'];
  change: Scalars['Int']['output'];
  remove: Scalars['Int']['output'];
  typeCount: Scalars['Int']['output'];
};

export type GeneralProposalComment = {
  createdAt: Scalars['Timestamp']['output'];
  /** null if the user is deleted */
  createdBy?: Maybe<Identity>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  status: CommentStatus;
  /** null if never updated */
  updatedAt?: Maybe<Scalars['Timestamp']['output']>;
};

export type GitContext = {
  __typename?: 'GitContext';
  commit?: Maybe<Scalars['ID']['output']>;
};

/** This is stored with a schema when it is uploaded */
export type GitContextInput = {
  /** The Git repository branch used in the check. */
  branch?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the Git commit used in the check. */
  commit?: InputMaybe<Scalars['ID']['input']>;
  /** The username of the user who created the Git commit used in the check. */
  committer?: InputMaybe<Scalars['String']['input']>;
  /** The commit message of the Git commit used in the check. */
  message?: InputMaybe<Scalars['String']['input']>;
  /** The Git repository's remote URL. */
  remoteUrl?: InputMaybe<Scalars['String']['input']>;
};

/**
 * A graph in Apollo Studio represents a graph in your organization.
 * Each graph has one or more variants, which correspond to the different environments where that graph runs (such as staging and production).
 * Each variant has its own GraphQL schema, which means schemas can differ between environments.
 */
export type Graph = Identity & {
  __typename?: 'Graph';
  /** The organization that this graph belongs to. */
  account?: Maybe<Organization>;
  /** A list of the graph API keys that are active for this graph. */
  apiKeys?: Maybe<Array<GraphApiKey>>;
  /** Provides a view of the graph as an `Actor` type. */
  asActor: Actor;
  /** Get check configuration for this graph. */
  checkConfiguration?: Maybe<CheckConfiguration>;
  /** Get a check workflow for this graph by its ID */
  checkWorkflow?: Maybe<CheckWorkflow>;
  /** Get check workflows for this graph ordered by creation time, most recent first. */
  checkWorkflows: Array<CheckWorkflow>;
  /** Returns the default reviewers for this graph. This field accepts up to 1000 requests per minute. This rate may be temporarily adjusted based on system conditions. */
  defaultProposalReviewers: Array<Maybe<Identity>>;
  /** Get a GraphQL document by hash */
  doc?: Maybe<GraphQlDoc>;
  /** Get GraphQL documents by hash, max up to 100 can be requested per query. This field accepts up to 120 requests per minute. This rate may be temporarily adjusted based on system conditions. */
  docs?: Maybe<Array<Maybe<GraphQlDoc>>>;
  /**
   * Get a GraphQL document by hash
   * @deprecated Use doc instead
   */
  document?: Maybe<Scalars['GraphQLDocument']['output']>;
  /** Diffs the sdls at the oldSdlHash and newSdlHash, returning a FlatDiffResult. This field accepts up to 1000 requests per minute. This rate may be temporarily adjusted based on system conditions. */
  flatDiff: FlatDiffResult;
  /**
   * When this is true, this graph will be hidden from non-admin members of the org who haven't been explicitly assigned a
   * role on this graph.
   */
  hiddenFromUninvitedNonAdminAccountMembers: Scalars['Boolean']['output'];
  /** The graph's globally unique identifier. */
  id: Scalars['ID']['output'];
  /** Permissions of the current user in this graph. */
  myRole?: Maybe<UserPermission>;
  name: Scalars['String']['output'];
  /** The Persisted Query List associated with this graph with the given ID. */
  persistedQueryList?: Maybe<PersistedQueryList>;
  /**
   * A list of the proposals for this graph sorted by created at date.
   * limit defaults to 25 and has an allowed max of 50, offset defaults to 0.
   * This field accepts up to 1000 requests per minute. This rate may be temporarily adjusted based on system conditions.
   */
  proposals: ProposalsResult;
  /** Describes the permissions that the active user has for this graph. */
  roles?: Maybe<GraphRoles>;
  /** The graph's name. */
  title: Scalars['String']['output'];
  /** Count checkWorkflows for the given filter. Used for paginating with checkWorkflows. */
  totalCheckWorkflowCount: Scalars['Int']['output'];
  /**
   * Provides details of the graph variant with the provided `name`, if a variant
   * with that name exists for this graph. Otherwise, returns null.
   *
   *  For a list of _all_ variants associated with a graph, use `Graph.variants` instead.
   */
  variant?: Maybe<GraphVariant>;
  /** A list of the variants for this graph. */
  variants: Array<GraphVariant>;
};


/**
 * A graph in Apollo Studio represents a graph in your organization.
 * Each graph has one or more variants, which correspond to the different environments where that graph runs (such as staging and production).
 * Each variant has its own GraphQL schema, which means schemas can differ between environments.
 */
export type GraphCheckWorkflowArgs = {
  id: Scalars['ID']['input'];
};


/**
 * A graph in Apollo Studio represents a graph in your organization.
 * Each graph has one or more variants, which correspond to the different environments where that graph runs (such as staging and production).
 * Each variant has its own GraphQL schema, which means schemas can differ between environments.
 */
export type GraphCheckWorkflowsArgs = {
  filter?: InputMaybe<CheckFilterInput>;
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};


/**
 * A graph in Apollo Studio represents a graph in your organization.
 * Each graph has one or more variants, which correspond to the different environments where that graph runs (such as staging and production).
 * Each variant has its own GraphQL schema, which means schemas can differ between environments.
 */
export type GraphDocArgs = {
  hash?: InputMaybe<Scalars['SHA256']['input']>;
};


/**
 * A graph in Apollo Studio represents a graph in your organization.
 * Each graph has one or more variants, which correspond to the different environments where that graph runs (such as staging and production).
 * Each variant has its own GraphQL schema, which means schemas can differ between environments.
 */
export type GraphDocsArgs = {
  hashes: Array<Scalars['SHA256']['input']>;
};


/**
 * A graph in Apollo Studio represents a graph in your organization.
 * Each graph has one or more variants, which correspond to the different environments where that graph runs (such as staging and production).
 * Each variant has its own GraphQL schema, which means schemas can differ between environments.
 */
export type GraphDocumentArgs = {
  hash?: InputMaybe<Scalars['SHA256']['input']>;
};


/**
 * A graph in Apollo Studio represents a graph in your organization.
 * Each graph has one or more variants, which correspond to the different environments where that graph runs (such as staging and production).
 * Each variant has its own GraphQL schema, which means schemas can differ between environments.
 */
export type GraphFlatDiffArgs = {
  newSdlHash?: InputMaybe<Scalars['SHA256']['input']>;
  oldSdlHash?: InputMaybe<Scalars['SHA256']['input']>;
};


/**
 * A graph in Apollo Studio represents a graph in your organization.
 * Each graph has one or more variants, which correspond to the different environments where that graph runs (such as staging and production).
 * Each variant has its own GraphQL schema, which means schemas can differ between environments.
 */
export type GraphPersistedQueryListArgs = {
  id: Scalars['ID']['input'];
};


/**
 * A graph in Apollo Studio represents a graph in your organization.
 * Each graph has one or more variants, which correspond to the different environments where that graph runs (such as staging and production).
 * Each variant has its own GraphQL schema, which means schemas can differ between environments.
 */
export type GraphProposalsArgs = {
  filterBy?: InputMaybe<ProposalsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * A graph in Apollo Studio represents a graph in your organization.
 * Each graph has one or more variants, which correspond to the different environments where that graph runs (such as staging and production).
 * Each variant has its own GraphQL schema, which means schemas can differ between environments.
 */
export type GraphTotalCheckWorkflowCountArgs = {
  filter?: InputMaybe<CheckFilterInput>;
};


/**
 * A graph in Apollo Studio represents a graph in your organization.
 * Each graph has one or more variants, which correspond to the different environments where that graph runs (such as staging and production).
 * Each variant has its own GraphQL schema, which means schemas can differ between environments.
 */
export type GraphVariantArgs = {
  name: Scalars['String']['input'];
};

/**
 * Represents a graph API key, which has permissions scoped to a
 * user role for a single Apollo graph.
 */
export type GraphApiKey = ApiKey & {
  __typename?: 'GraphApiKey';
  /** The timestamp when the API key was created. */
  createdAt: Scalars['Timestamp']['output'];
  /** Details of the user or graph that created the API key. */
  createdBy?: Maybe<Identity>;
  /** The API key's ID. */
  id: Scalars['ID']['output'];
  /** The API key's name, for distinguishing it from other keys. */
  keyName?: Maybe<Scalars['String']['output']>;
  /** The permission level assigned to the API key upon creation. */
  role: UserPermission;
  /** The value of the API key. **This is a secret credential!** */
  token: Scalars['String']['output'];
};

/** The timing details for the build step of a launch. */
export type GraphCreationError = {
  __typename?: 'GraphCreationError';
  message: Scalars['String']['output'];
};

export type GraphCreationResult = Graph | GraphCreationError;

/** A union of all containers that can comprise the components of a Studio graph */
export type GraphImplementors = GraphVariantSubgraphs;

/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutation = {
  __typename?: 'GraphMutation';
  /**
   * Checks a proposed subgraph schema change against a published subgraph.
   * If the proposal composes successfully, perform a usage check for the resulting supergraph schema.
   * @deprecated Use GraphVariant.submitSubgraphCheckAsync instead.
   * This mutation polls to wait for the check to finish,
   * while subgraphSubgraphCheckAsync triggers returns
   * without waiting for the check to finish.
   */
  checkPartialSchema: CheckPartialSchemaResult;
  /**
   * Checks a proposed schema against the schema that has been published to
   * a particular variant, using metrics corresponding to `historicParameters`.
   * Callers can set `historicParameters` directly or rely on defaults set in the
   * graph's check configuration (7 days by default).
   * If they do not set `historicParameters` but set `useMaximumRetention`,
   * validation will use the maximum retention the graph has access to.
   */
  checkSchema: CheckSchemaResult;
  /** Create a new Persisted Query List. */
  createPersistedQueryList: CreatePersistedQueryListResultOrError;
  /** Creates a proposal variant from a source variant and a name, description. See the documentation for proposal creation at https://www.apollographql.com/docs/graphos/delivery/schema-proposals/creation This field accepts up to 500 requests per minute. This rate may be temporarily adjusted based on system conditions. */
  createProposal: CreateProposalResult;
  /** Soft delete a graph. Data associated with the graph is not permanently deleted; Apollo support can undo. */
  delete?: Maybe<Scalars['Void']['output']>;
  /** Lint a single schema using the graph's linter configuration. */
  lintSchema: LintResult;
  /** Generates a new graph API key for this graph with the specified permission level. */
  newKey: GraphApiKey;
  /** Provides access to mutation fields for modifying a Persisted Query List with the provided ID. */
  persistedQueryList: PersistedQueryListMutation;
  /** Publish to a subgraph. If composition is successful, this will update running routers. */
  publishSubgraph?: Maybe<SubgraphPublicationResult>;
  /**
   * Publishes multiple subgraphs. If composition is successful, this will update running routers.
   * This field accepts up to 120 requests per minute. This rate may be temporarily adjusted based on system conditions.
   */
  publishSubgraphs?: Maybe<SubgraphPublicationResult>;
  /** Removes a subgraph. If composition is successful, this will update running routers. */
  removeImplementingServiceAndTriggerComposition: SubgraphRemovalResult;
  /** Deletes the existing graph API key with the provided ID, if any. */
  removeKey?: Maybe<Scalars['Void']['output']>;
  /** Sets a new name for the graph API key with the provided ID, if any. This does not invalidate the key or change its value. */
  renameKey?: Maybe<GraphApiKey>;
  setCustomCheckConfiguration: CustomCheckConfigurationResult;
  /** Undelete a soft deleted graph. */
  undelete?: Maybe<Graph>;
  /** Update schema check configuration for a graph. */
  updateCheckConfiguration: CheckConfiguration;
  /** Update hiddenFromUninvitedNonAdminAccountMembers */
  updateHiddenFromUninvitedNonAdminAccountMembers?: Maybe<Graph>;
  /** Publish a schema to this variant, either via a document or an introspection query result. */
  uploadSchema?: Maybe<SchemaPublicationResult>;
  /** Creates a contract schema from a source variant and a set of filter configurations */
  upsertContractVariant: ContractVariantUpsertResult;
  /** Make changes to a graph variant. */
  variant?: Maybe<GraphVariantMutation>;
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationCheckPartialSchemaArgs = {
  frontend?: InputMaybe<Scalars['String']['input']>;
  gitContext?: InputMaybe<GitContextInput>;
  graphVariant: Scalars['String']['input'];
  historicParameters?: InputMaybe<HistoricQueryParameters>;
  implementingServiceName: Scalars['String']['input'];
  introspectionEndpoint?: InputMaybe<Scalars['String']['input']>;
  isProposalCheck?: Scalars['Boolean']['input'];
  isSandboxCheck?: Scalars['Boolean']['input'];
  partialSchema: PartialSchemaInput;
  useMaximumRetention?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationCheckSchemaArgs = {
  baseSchemaTag?: InputMaybe<Scalars['String']['input']>;
  frontend?: InputMaybe<Scalars['String']['input']>;
  gitContext?: InputMaybe<GitContextInput>;
  historicParameters?: InputMaybe<HistoricQueryParameters>;
  introspectionEndpoint?: InputMaybe<Scalars['String']['input']>;
  isProposalCheck?: Scalars['Boolean']['input'];
  isSandboxCheck?: Scalars['Boolean']['input'];
  proposedSchema?: InputMaybe<IntrospectionSchemaInput>;
  proposedSchemaDocument?: InputMaybe<Scalars['String']['input']>;
  proposedSchemaHash?: InputMaybe<Scalars['String']['input']>;
  useMaximumRetention?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationCreatePersistedQueryListArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationCreateProposalArgs = {
  input: CreateProposalInput;
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationLintSchemaArgs = {
  baseSdl?: InputMaybe<Scalars['String']['input']>;
  sdl: Scalars['String']['input'];
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationNewKeyArgs = {
  keyName?: InputMaybe<Scalars['String']['input']>;
  role?: UserPermission;
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationPersistedQueryListArgs = {
  id: Scalars['ID']['input'];
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationPublishSubgraphArgs = {
  activePartialSchema: PartialSchemaInput;
  downstreamLaunchInitiation?: InputMaybe<DownstreamLaunchInitiation>;
  gitContext?: InputMaybe<GitContextInput>;
  graphVariant: Scalars['String']['input'];
  name: Scalars['String']['input'];
  revision: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationPublishSubgraphsArgs = {
  downstreamLaunchInitiation?: InputMaybe<DownstreamLaunchInitiation>;
  gitContext?: InputMaybe<GitContextInput>;
  graphVariant: Scalars['String']['input'];
  revision: Scalars['String']['input'];
  subgraphInputs: Array<PublishSubgraphsSubgraphInput>;
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationRemoveImplementingServiceAndTriggerCompositionArgs = {
  dryRun?: Scalars['Boolean']['input'];
  graphVariant: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationRemoveKeyArgs = {
  id: Scalars['ID']['input'];
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationRenameKeyArgs = {
  id: Scalars['ID']['input'];
  newKeyName?: InputMaybe<Scalars['String']['input']>;
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationSetCustomCheckConfigurationArgs = {
  input: SetCustomCheckConfigurationInput;
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationUpdateCheckConfigurationArgs = {
  downgradeDefaultValueChange?: InputMaybe<Scalars['Boolean']['input']>;
  downgradeStaticChecks?: InputMaybe<Scalars['Boolean']['input']>;
  enableCustomChecks?: InputMaybe<Scalars['Boolean']['input']>;
  enableLintChecks?: InputMaybe<Scalars['Boolean']['input']>;
  excludedClients?: InputMaybe<Array<ClientFilterInput>>;
  excludedOperationNames?: InputMaybe<Array<OperationNameFilterInput>>;
  excludedOperations?: InputMaybe<Array<ExcludedOperationInput>>;
  includeBaseVariant?: InputMaybe<Scalars['Boolean']['input']>;
  includedVariants?: InputMaybe<Array<Scalars['String']['input']>>;
  operationCountThreshold?: InputMaybe<Scalars['Int']['input']>;
  operationCountThresholdPercentage?: InputMaybe<Scalars['Float']['input']>;
  proposalChangeMismatchSeverity?: InputMaybe<ProposalChangeMismatchSeverity>;
  timeRangeSeconds?: InputMaybe<Scalars['Long']['input']>;
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationUpdateHiddenFromUninvitedNonAdminAccountMembersArgs = {
  hiddenFromUninvitedNonAdminAccountMembers: Scalars['Boolean']['input'];
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationUploadSchemaArgs = {
  errorOnBadRequest?: Scalars['Boolean']['input'];
  gitContext?: InputMaybe<GitContextInput>;
  historicParameters?: InputMaybe<HistoricQueryParameters>;
  overrideComposedSchema?: Scalars['Boolean']['input'];
  schema?: InputMaybe<IntrospectionSchemaInput>;
  schemaDocument?: InputMaybe<Scalars['String']['input']>;
  tag: Scalars['String']['input'];
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationUpsertContractVariantArgs = {
  contractVariantName: Scalars['String']['input'];
  filterConfig: FilterConfigInput;
  initiateLaunch?: Scalars['Boolean']['input'];
  sourceVariant?: InputMaybe<Scalars['String']['input']>;
};


/** Provides access to mutation fields for managing Studio graphs and subgraphs. */
export type GraphMutationVariantArgs = {
  name: Scalars['String']['input'];
};

export type GraphQlDoc = {
  __typename?: 'GraphQLDoc';
  graph: Graph;
  hash: Scalars['ID']['output'];
  source: Scalars['GraphQLDocument']['output'];
};

/** Individual permissions for the current user when interacting with a particular Studio graph. */
export type GraphRoles = {
  __typename?: 'GraphRoles';
  /** Whether the currently authenticated user is permitted to perform schema checks (i.e., run `rover (sub)graph check`). */
  canCheckSchemas: Scalars['Boolean']['output'];
  canCreateProposal: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to create new graph variants. */
  canCreateVariants: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to delete the graph in question */
  canDelete: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to delete proposal variants. */
  canDeleteProposalVariants: Scalars['Boolean']['output'];
  /** Given the graph's setting regarding proposal permission levels, can the current user edit Proposals authored by other users */
  canEditProposal: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to manage user access to the graph in question. */
  canManageAccess: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to manage the build configuration (e.g., build pipeline version). */
  canManageBuildConfig: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to manage third-party integrations (e.g., Datadog forwarding). */
  canManageIntegrations: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to manage graph-level API keys. */
  canManageKeys: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to manage proposal permission settings for this graph. */
  canManageProposalPermissions: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to manage proposal settings, like setting the implementation variant, on this graph. */
  canManageProposalSettings: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to perform basic administration of variants (e.g., make a variant public). */
  canManageVariants: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to view details about the build configuration (e.g. build pipeline version). */
  canQueryBuildConfig: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to view details of the check configuration for this graph. */
  canQueryCheckConfiguration: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to view which subgraphs the graph is composed of. */
  canQueryImplementingServices: Scalars['Boolean']['output'];
  canQueryProposals: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to download schemas owned by this graph. */
  canQuerySchemas: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to register operations (i.e. `apollo client:push`) for this graph. */
  canRegisterOperations: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to make updates to the check configuration for this graph. */
  canWriteCheckConfiguration: Scalars['Boolean']['output'];
  service: Graph;
};

export enum GraphType {
  Classic = 'CLASSIC',
  CloudSupergraph = 'CLOUD_SUPERGRAPH',
  SelfHostedSupergraph = 'SELF_HOSTED_SUPERGRAPH'
}

/** A graph variant */
export type GraphVariant = {
  __typename?: 'GraphVariant';
  checkConfiguration: VariantCheckConfiguration;
  /** Compose and filter preview contract schema built from this source variant. */
  composeAndFilterPreview?: Maybe<ComposeAndFilterPreviewResult>;
  /** The filter configuration used to build a contract schema. The configuration consists of lists of tags for schema elements to include or exclude in the resulting schema. */
  contractFilterConfig?: Maybe<FilterConfig>;
  /**
   * A human-readable description of the filter configuration of this contract variant, or null if this isn't a contract
   * variant.
   */
  contractFilterConfigDescription?: Maybe<Scalars['String']['output']>;
  /** Time the variant was created */
  createdAt: Scalars['Timestamp']['output'];
  /** Custom check configuration for this graph. */
  customCheckConfiguration?: Maybe<CustomCheckConfiguration>;
  /** Federation version this variant uses */
  federationVersion?: Maybe<Scalars['String']['output']>;
  /** The graph that this variant belongs to. */
  graph: Graph;
  /** The variant's global identifier in the form `graphID@variant`. */
  id: Scalars['ID']['output'];
  /** Represents whether this variant is a Proposal. */
  isProposal?: Maybe<Scalars['Boolean']['output']>;
  /** Latest approved launch for the variant, and what is served through Uplink. */
  latestApprovedLaunch?: Maybe<Launch>;
  /** Latest launch for the variant, whether successful or not. */
  latestLaunch?: Maybe<Launch>;
  /** The details of the variant's most recent publication. */
  latestPublication?: Maybe<SchemaPublication>;
  /** Retrieve a launch for this variant by ID. */
  launch?: Maybe<Launch>;
  /** A list of launches metadata ordered by date, asc or desc depending on orderBy. The maximum limit is 100. */
  launchSummaries?: Maybe<Array<LaunchSummary>>;
  /** The variant's name (e.g., `staging`). */
  name: Scalars['String']['output'];
  /**
   * A list of the saved [operation collections](https://www.apollographql.com/docs/studio/explorer/operation-collections/) associated with this variant.
   * This field accepts up to 400 requests per minute. This rate may be temporarily adjusted based on system conditions.
   */
  operationCollections: Array<OperationCollection>;
  /** Which permissions the current user has for interacting with this variant */
  permissions: GraphVariantPermissions;
  /** The Persisted Query List linked to this variant, if any. */
  persistedQueryList?: Maybe<PersistedQueryList>;
  /** Returns the proposal-related fields for this graph variant if the variant is a proposal; otherwise, returns null. This field accepts up to 1000 requests per minute. This rate may be temporarily adjusted based on system conditions. */
  proposal?: Maybe<Proposal>;
  readme: Readme;
  /** Router associated with this graph variant */
  router?: Maybe<Router>;
  routerConfig?: Maybe<Scalars['String']['output']>;
  /** The variant this variant is derived from. This property currently only exists on contract variants. */
  sourceVariant?: Maybe<GraphVariant>;
  /** Returns the details of the subgraph with the provided `name`, or null if this variant doesn't include a subgraph with that name. */
  subgraph?: Maybe<GraphVariantSubgraph>;
  /** A list of the subgraphs included in this variant. This value is null for non-federated variants. Set `includeDeleted` to `true` to include deleted subgraphs. */
  subgraphs?: Maybe<Array<GraphVariantSubgraph>>;
  /** The URL of the variant's GraphQL endpoint for subscription operations. */
  subscriptionUrl?: Maybe<Scalars['String']['output']>;
  /**
   * Returns a list of the top operations reported for this variant within a given time range. This API is rate limited,
   * and will return an error if too many requests are made for a graph.
   */
  topOperationsReport: Array<TopOperationRecord>;
  /**
   * A list of the subgraphs that have been published to since the variant was created.
   * Does not include subgraphs that were created & deleted since the variant was created.
   *
   * TODO: @deprecated(reason: "use GraphVariant.updatedSubgraphsSinceCreation instead")
   */
  updatedSubgraphs?: Maybe<Array<GraphVariantSubgraph>>;
  /** The URL of the variant's GraphQL endpoint for query and mutation operations. For subscription operations, use `subscriptionUrl`. */
  url?: Maybe<Scalars['String']['output']>;
  /** Validate router configuration for this graph variant */
  validateRouter: CloudValidationResult;
};


/** A graph variant */
export type GraphVariantComposeAndFilterPreviewArgs = {
  filterConfig?: InputMaybe<FilterConfigInput>;
  subgraphChanges?: InputMaybe<Array<ComposeAndFilterPreviewSubgraphChange>>;
};


/** A graph variant */
export type GraphVariantLaunchArgs = {
  id: Scalars['ID']['input'];
};


/** A graph variant */
export type GraphVariantLaunchSummariesArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  orderBy?: LaunchHistoryOrder;
};


/** A graph variant */
export type GraphVariantSubgraphArgs = {
  name: Scalars['ID']['input'];
};


/** A graph variant */
export type GraphVariantSubgraphsArgs = {
  includeDeleted?: Scalars['Boolean']['input'];
};


/** A graph variant */
export type GraphVariantTopOperationsReportArgs = {
  filter?: InputMaybe<TopOperationsReportVariantFilterInput>;
  from: Scalars['Timestamp']['input'];
  limit?: Scalars['Int']['input'];
  orderBy?: InputMaybe<TopOperationsReportOrderByInput>;
  to: Scalars['Timestamp']['input'];
};


/** A graph variant */
export type GraphVariantValidateRouterArgs = {
  config: RouterConfigInput;
};

/** The result of attempting to delete a graph variant. */
export type GraphVariantDeletionResult = {
  __typename?: 'GraphVariantDeletionResult';
  /** Whether the variant was deleted or not. */
  deleted: Scalars['Boolean']['output'];
};

/** Result of looking up a variant by ref */
export type GraphVariantLookup = GraphVariant | InvalidRefFormat;

/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutation = {
  __typename?: 'GraphVariantMutation';
  /**
   * Callback mutation for submitting custom check results once your validation has run.
   * Results are returned with the SUCCESS or FAILURE of your validations, the task and workflow ids
   * to associate results, with and an optional list of violations to provide more details to users.
   * The Schema Check will wait for this response for 10 minutes and not complete until the results are returned.
   * After 10 minutes have passed without a callback request being received, the task will be marked as timed out.
   */
  customCheckCallback: CustomCheckCallbackResult;
  /** Delete the variant. */
  delete: GraphVariantDeletionResult;
  /** Links a specified PersistedQueryList to the variant of the parent GraphVariantMutation. */
  linkPersistedQueryList: LinkPersistedQueryListResultOrError;
  /** Provides access to mutation fields for modifying a GraphOS Schema Proposal, if this GraphVariant is a proposal variant; else returns NotFoundError. Learn more at https://www.apollographql.com/docs/graphos/delivery/schema-proposals */
  proposal: ProposalMutationResult;
  /** Gets the router attached to a graph variant */
  router?: Maybe<RouterMutation>;
  setCustomCheckConfiguration: CustomCheckConfigurationResult;
  /**
   * _Asynchronously_ kicks off operation checks for a proposed non-federated
   * schema change against its associated graph.
   *
   * Returns a `CheckRequestSuccess` object with a workflow ID that you can use
   * to check status, or an error object if the checks workflow failed to start.
   *
   * Rate limited to 3000 per min. Schema checks cannot be performed on contract variants.
   */
  submitCheckSchemaAsync: CheckRequestResult;
  /**
   *  _Asynchronously_ kicks off composition and operation checks for all proposed subgraphs schema changes against its associated supergraph.
   *
   *  Returns a `CheckRequestSuccess` object with a workflow ID that you can use
   *  to check status, or an error object if the checks workflow failed to start.
   *
   * Rate limited to 3000 per min. Subgraph checks cannot be performed on contract variants.
   */
  submitMultiSubgraphCheckAsync: CheckRequestResult;
  /**
   * _Asynchronously_ kicks off composition and operation checks for a proposed subgraph schema change against its associated supergraph.
   *
   * Returns a `CheckRequestSuccess` object with a workflow ID that you can use
   * to check status, or an error object if the checks workflow failed to start.
   *
   * Rate limited to 3000 per min. Subgraph checks cannot be performed on contract variants.
   */
  submitSubgraphCheckAsync: CheckRequestResult;
  /** Unlinks a specified PersistedQueryList from the variant of the parent GraphVariantMutation. */
  unlinkPersistedQueryList: UnlinkPersistedQueryListResultOrError;
  updateCheckConfigurationCustomChecks: VariantCheckConfiguration;
  updateCheckConfigurationDowngradeChecks: VariantCheckConfiguration;
  updateCheckConfigurationDownstreamVariants: VariantCheckConfiguration;
  updateCheckConfigurationEnableOperationsCheck?: Maybe<VariantCheckConfiguration>;
  updateCheckConfigurationExcludedClients: VariantCheckConfiguration;
  updateCheckConfigurationExcludedOperations: VariantCheckConfiguration;
  updateCheckConfigurationIncludedVariants: VariantCheckConfiguration;
  updateCheckConfigurationProposalChangeMismatchSeverity: VariantCheckConfiguration;
  updateCheckConfigurationTimeRange: VariantCheckConfiguration;
  updateURL?: Maybe<GraphVariant>;
  /** Updates the [federation version](https://www.apollographql.com/docs/graphos/reference/router/federation-version-support) of this variant */
  updateVariantFederationVersion?: Maybe<GraphVariant>;
  /** Updates the [README](https://www.apollographql.com/docs/studio/org/graphs/#the-readme-page) of this variant. */
  updateVariantReadme?: Maybe<GraphVariant>;
  upsertRouterConfig?: Maybe<UpsertRouterResult>;
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationCustomCheckCallbackArgs = {
  input: CustomCheckCallbackInput;
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationLinkPersistedQueryListArgs = {
  persistedQueryListId: Scalars['ID']['input'];
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationSetCustomCheckConfigurationArgs = {
  input: SetCustomCheckConfigurationInput;
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationSubmitCheckSchemaAsyncArgs = {
  input: CheckSchemaAsyncInput;
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationSubmitMultiSubgraphCheckAsyncArgs = {
  input: MultiSubgraphCheckAsyncInput;
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationSubmitSubgraphCheckAsyncArgs = {
  input: SubgraphCheckAsyncInput;
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationUpdateCheckConfigurationCustomChecksArgs = {
  enableCustomChecks?: InputMaybe<Scalars['Boolean']['input']>;
  useGraphSettings: Scalars['Boolean']['input'];
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationUpdateCheckConfigurationDowngradeChecksArgs = {
  downgradeDefaultValueChange?: InputMaybe<Scalars['Boolean']['input']>;
  downgradeStaticChecks?: InputMaybe<Scalars['Boolean']['input']>;
  useGraphSettings: Scalars['Boolean']['input'];
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationUpdateCheckConfigurationDownstreamVariantsArgs = {
  blockingDownstreamVariants?: InputMaybe<Array<Scalars['String']['input']>>;
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationUpdateCheckConfigurationEnableOperationsCheckArgs = {
  enabled: Scalars['Boolean']['input'];
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationUpdateCheckConfigurationExcludedClientsArgs = {
  appendGraphSettings: Scalars['Boolean']['input'];
  excludedClients?: InputMaybe<Array<ClientFilterInput>>;
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationUpdateCheckConfigurationExcludedOperationsArgs = {
  appendGraphSettings: Scalars['Boolean']['input'];
  excludedOperationNames?: InputMaybe<Array<OperationNameFilterInput>>;
  excludedOperations?: InputMaybe<Array<OperationInfoFilterInput>>;
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationUpdateCheckConfigurationIncludedVariantsArgs = {
  includedVariants?: InputMaybe<Array<Scalars['String']['input']>>;
  useGraphSettings: Scalars['Boolean']['input'];
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationUpdateCheckConfigurationProposalChangeMismatchSeverityArgs = {
  proposalChangeMismatchSeverity?: InputMaybe<ProposalChangeMismatchSeverity>;
  useGraphSettings?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationUpdateCheckConfigurationTimeRangeArgs = {
  operationCountThreshold?: InputMaybe<Scalars['Int']['input']>;
  operationCountThresholdPercentage?: InputMaybe<Scalars['Float']['input']>;
  timeRangeSeconds?: InputMaybe<Scalars['Long']['input']>;
  useGraphSettings: Scalars['Boolean']['input'];
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationUpdateUrlArgs = {
  url?: InputMaybe<Scalars['String']['input']>;
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationUpdateVariantFederationVersionArgs = {
  version: BuildPipelineTrack;
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationUpdateVariantReadmeArgs = {
  readme: Scalars['String']['input'];
};


/** Modifies a variant of a graph, also called a schema tag in parts of our product. */
export type GraphVariantMutationUpsertRouterConfigArgs = {
  configuration: Scalars['String']['input'];
};

/** Individual permissions for the current user when interacting with a particular Studio graph variant. */
export type GraphVariantPermissions = {
  __typename?: 'GraphVariantPermissions';
  canCreateCollectionInVariant: Scalars['Boolean']['output'];
  /** If this variant is a Proposal, will match the Proposal.canEditProposal field (can the current user can edit this Proposal either by authorship or role level). False if this GraphVariant is not a Proposal. */
  canEditProposal: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to manage/update this variant's build configuration (e.g., build pipeline version). */
  canManageBuildConfig: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to manage/update cloud routers */
  canManageCloudRouter: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to update variant-level settings for the Apollo Studio Explorer. */
  canManageExplorerSettings: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to publish schemas to this variant. */
  canPushSchemas: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to view this variant's build configuration details (e.g., build pipeline version). */
  canQueryBuildConfig: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to view details regarding cloud routers */
  canQueryCloudRouter: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to view cloud router logs */
  canQueryCloudRouterLogs: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to view launch history */
  canQueryLaunches: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to download schemas associated to this variant. */
  canQuerySchemas: Scalars['Boolean']['output'];
  canShareCollectionInVariant: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is permitted to update the README for this variant. */
  canUpdateVariantReadme: Scalars['Boolean']['output'];
};

/** A single subgraph in a supergraph. Every supergraph managed by Apollo Studio includes at least one subgraph. See https://www.apollographql.com/docs/federation/managed-federation/overview/ for more information. */
export type GraphVariantSubgraph = {
  __typename?: 'GraphVariantSubgraph';
  /** The subgraph's current active schema, used in supergraph composition for the the associated variant. */
  activePartialSchema: SubgraphSchema;
  /** The timestamp when the subgraph was created. */
  createdAt: Scalars['Timestamp']['output'];
  /** The timestamp when the subgraph was deleted. Null if it wasn't deleted. */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** The ID of the graph this subgraph belongs to. */
  graphID: Scalars['String']['output'];
  /** The name of the graph variant this subgraph belongs to. */
  graphVariant: Scalars['String']['output'];
  /** The subgraph's name. */
  name: Scalars['String']['output'];
  /** The current user-provided version/edition of the subgraph. Typically a Git SHA or docker image ID. */
  revision: Scalars['String']['output'];
  /** The timestamp when the subgraph was most recently updated. */
  updatedAt: Scalars['Timestamp']['output'];
  /** The URL of the subgraph's GraphQL endpoint. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Container for a list of subgraphs composing a supergraph. */
export type GraphVariantSubgraphs = {
  __typename?: 'GraphVariantSubgraphs';
  /** The list of underlying subgraphs. */
  services: Array<GraphVariantSubgraph>;
};

export type HistoricQueryParameters = {
  /** A list of clients to filter out during validation. */
  excludedClients?: InputMaybe<Array<ClientInfoFilter>>;
  /** A list of operation names to filter out during validation. */
  excludedOperationNames?: InputMaybe<Array<OperationNameFilterInput>>;
  from?: InputMaybe<Scalars['String']['input']>;
  /** A list of operation IDs to filter out during validation. */
  ignoredOperations?: InputMaybe<Array<Scalars['ID']['input']>>;
  /**
   * A list of variants to include in the validation. If no variants are provided
   * then this defaults to the "current" variant along with the base variant. The
   * base variant indicates the schema that generates diff and marks the metrics that
   * are checked for broken queries. We union this base variant with the untagged values('',
   * same as null inside of `in`, and 'current') in this metrics fetch. This strategy
   * supports users who have not tagged their metrics or schema.
   */
  includedVariants?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Minimum number of requests within the window for a query to be considered. */
  queryCountThreshold?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Number of requests within the window for a query to be considered, relative to
   * total request count. Expected values are between 0 and 0.05 (minimum 5% of total
   * request volume)
   */
  queryCountThresholdPercentage?: InputMaybe<Scalars['Float']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

/** Input type to provide when specifying configuration details for schema checks. */
export type HistoricQueryParametersInput = {
  /** Clients to be excluded from check. */
  excludedClients?: InputMaybe<Array<ClientInfoFilter>>;
  /** Operations to be ignored in this schema check, specified by operation name. */
  excludedOperationNames?: InputMaybe<Array<OperationNameFilterInput>>;
  /** Start time for operations to be checked against. Specified as either a) an ISO formatted date/time string or b) a negative number of seconds relative to the time the check request was submitted. */
  from?: InputMaybe<Scalars['String']['input']>;
  /** Operations to be ignored in this schema check, specified by ID. */
  ignoredOperations?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Graph variants to be included in check. */
  includedVariants?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Maximum number of queries to be checked against the change. */
  queryCountThreshold?: InputMaybe<Scalars['Int']['input']>;
  /** Only fail check if this percentage of operations would be negatively impacted. */
  queryCountThresholdPercentage?: InputMaybe<Scalars['Float']['input']>;
  /** End time for operations to be checked against. Specified as either a) an ISO formatted date/time string or b) a negative number of seconds relative to the time the check request was submitted. */
  to?: InputMaybe<Scalars['String']['input']>;
};

/** An identity (such as a `User` or `Graph`) in Apollo Studio. See implementing types for details. */
export type Identity = {
  /** Returns a representation of the identity as an `Actor` type. */
  asActor: Actor;
  /** The identity's identifier, which is unique among objects of its type. */
  id: Scalars['ID']['output'];
  /** The identity's human-readable name. */
  name: Scalars['String']['output'];
};

export type InternalIdentity = Identity & {
  __typename?: 'InternalIdentity';
  accounts: Array<Organization>;
  asActor: Actor;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/** Generic server error. This should only ever return 'internal server error' as a message */
export type InternalServerError = Error & {
  __typename?: 'InternalServerError';
  /** Message related to the internal error */
  message: Scalars['String']['output'];
};

export type IntrospectionDirectiveInput = {
  args: Array<IntrospectionInputValueInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  isRepeatable?: InputMaybe<Scalars['Boolean']['input']>;
  locations: Array<IntrospectionDirectiveLocation>;
  name: Scalars['String']['input'];
};

/** __DirectiveLocation introspection type */
export enum IntrospectionDirectiveLocation {
  /** Location adjacent to an argument definition. */
  ArgumentDefinition = 'ARGUMENT_DEFINITION',
  /** Location adjacent to an enum definition. */
  Enum = 'ENUM',
  /** Location adjacent to an enum value definition. */
  EnumValue = 'ENUM_VALUE',
  /** Location adjacent to a field. */
  Field = 'FIELD',
  /** Location adjacent to a field definition. */
  FieldDefinition = 'FIELD_DEFINITION',
  /** Location adjacent to a fragment definition. */
  FragmentDefinition = 'FRAGMENT_DEFINITION',
  /** Location adjacent to a fragment spread. */
  FragmentSpread = 'FRAGMENT_SPREAD',
  /** Location adjacent to an inline fragment. */
  InlineFragment = 'INLINE_FRAGMENT',
  /** Location adjacent to an input object field definition. */
  InputFieldDefinition = 'INPUT_FIELD_DEFINITION',
  /** Location adjacent to an input object type definition. */
  InputObject = 'INPUT_OBJECT',
  /** Location adjacent to an interface definition. */
  Interface = 'INTERFACE',
  /** Location adjacent to a mutation operation. */
  Mutation = 'MUTATION',
  /** Location adjacent to an object type definition. */
  Object = 'OBJECT',
  /** Location adjacent to a query operation. */
  Query = 'QUERY',
  /** Location adjacent to a scalar definition. */
  Scalar = 'SCALAR',
  /** Location adjacent to a schema definition. */
  Schema = 'SCHEMA',
  /** Location adjacent to a subscription operation. */
  Subscription = 'SUBSCRIPTION',
  /** Location adjacent to a union definition. */
  Union = 'UNION',
  /** Location adjacent to a variable definition. */
  VariableDefinition = 'VARIABLE_DEFINITION'
}

/** __EnumValue introspection type */
export type IntrospectionEnumValueInput = {
  deprecationReason?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isDeprecated: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

/** __Field introspection type */
export type IntrospectionFieldInput = {
  args: Array<IntrospectionInputValueInput>;
  deprecationReason?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isDeprecated: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  type: IntrospectionTypeInput;
};

/** __Value introspection type */
export type IntrospectionInputValueInput = {
  defaultValue?: InputMaybe<Scalars['String']['input']>;
  deprecationReason?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  type: IntrospectionTypeInput;
};

/** __Schema introspection type */
export type IntrospectionSchemaInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  directives: Array<IntrospectionDirectiveInput>;
  mutationType?: InputMaybe<IntrospectionTypeRefInput>;
  queryType: IntrospectionTypeRefInput;
  subscriptionType?: InputMaybe<IntrospectionTypeRefInput>;
  types?: InputMaybe<Array<IntrospectionTypeInput>>;
};

/** __Type introspection type */
export type IntrospectionTypeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  enumValues?: InputMaybe<Array<IntrospectionEnumValueInput>>;
  fields?: InputMaybe<Array<IntrospectionFieldInput>>;
  inputFields?: InputMaybe<Array<IntrospectionInputValueInput>>;
  interfaces?: InputMaybe<Array<IntrospectionTypeInput>>;
  kind: IntrospectionTypeKind;
  name?: InputMaybe<Scalars['String']['input']>;
  ofType?: InputMaybe<IntrospectionTypeInput>;
  possibleTypes?: InputMaybe<Array<IntrospectionTypeInput>>;
  specifiedByUrl?: InputMaybe<Scalars['String']['input']>;
};

export enum IntrospectionTypeKind {
  /** Indicates this type is an enum. 'enumValues' is a valid field. */
  Enum = 'ENUM',
  /** Indicates this type is an input object. 'inputFields' is a valid field. */
  InputObject = 'INPUT_OBJECT',
  /**
   * Indicates this type is an interface. 'fields' and 'possibleTypes' are valid
   * fields
   */
  Interface = 'INTERFACE',
  /** Indicates this type is a list. 'ofType' is a valid field. */
  List = 'LIST',
  /** Indicates this type is a non-null. 'ofType' is a valid field. */
  NonNull = 'NON_NULL',
  /** Indicates this type is an object. 'fields' and 'interfaces' are valid fields. */
  Object = 'OBJECT',
  /** Indicates this type is a scalar. */
  Scalar = 'SCALAR',
  /** Indicates this type is a union. 'possibleTypes' is a valid field. */
  Union = 'UNION'
}

/** Shallow __Type introspection type */
export type IntrospectionTypeRefInput = {
  kind?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** An error caused by providing invalid input for a task, such as schema checks. */
export type InvalidInputError = {
  __typename?: 'InvalidInputError';
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Generic input error */
export type InvalidInputErrors = Error & {
  __typename?: 'InvalidInputErrors';
  errors: Array<CloudInvalidInputError>;
  message: Scalars['String']['output'];
};

/** This object is returned when a request to fetch a Studio graph variant provides an invalid graph ref. */
export type InvalidRefFormat = Error & {
  __typename?: 'InvalidRefFormat';
  message: Scalars['String']['output'];
};

/** Represents the complete process of making a set of updates to a deployed graph variant. */
export type Launch = {
  __typename?: 'Launch';
  /** The timestamp when the launch was approved. */
  approvedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** The associated build for this launch (a build includes schema composition and contract filtering). This value is null until the build is initiated. */
  build?: Maybe<Build>;
  /** The inputs provided to this launch's associated build, including subgraph schemas and contract filters. */
  buildInput: BuildInput;
  /** The timestamp when the launch completed. This value is null until the launch completes. */
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** The timestamp when the launch was initiated. */
  createdAt: Scalars['Timestamp']['output'];
  /** Contract launches that were triggered by this launch. */
  downstreamLaunches: Array<Launch>;
  /** The ID of the launch's associated graph. */
  graphId: Scalars['String']['output'];
  /** The name of the launch's associated variant. */
  graphVariant: Scalars['String']['output'];
  /** The unique identifier for this launch. */
  id: Scalars['ID']['output'];
  /** Whether the launch completed. */
  isCompleted?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the result of the launch has been published to the associated graph and variant. This is always false for a failed launch. */
  isPublished?: Maybe<Scalars['Boolean']['output']>;
  /** The most recent launch sequence step that has started but not necessarily completed. */
  latestSequenceStep?: Maybe<LaunchSequenceStep>;
  /** Cloud Router order for this launch ID */
  order: OrderOrError;
  orders: Array<Order>;
  /** The launch immediately prior to this one. If successOnly is true, returns the most recent successful launch; if false, returns the most recent launch, regardless of success. If no such previous launch exists, returns null. */
  previousLaunch?: Maybe<Launch>;
  /** Returns the proposal revision associated with this launch, if it exists. This field accepts up to 1000 requests per minute. This rate may be temporarily adjusted based on system conditions. */
  proposalRevision?: Maybe<ProposalRevision>;
  /** A specific publication of a graph variant pertaining to this launch. */
  publication?: Maybe<SchemaPublication>;
  /** A list of results from the completed launch. The items included in this list vary depending on whether the launch succeeded, failed, or was superseded. */
  results: Array<LaunchResult>;
  /** Cloud router configuration associated with this build event. It will be non-null for any cloud-router variant, and null for any not cloudy variant/graph. */
  routerConfig?: Maybe<Scalars['String']['output']>;
  /** A list of all serial steps in the launch sequence. This list can change as the launch progresses. For example, a `LaunchCompletedStep` is appended after a launch completes. */
  sequence: Array<LaunchSequenceStep>;
  /** A shortened version of `Launch.id` that includes only the first 8 characters. */
  shortenedID: Scalars['String']['output'];
  /** The launch's status. If a launch is superseded, its status remains `LAUNCH_INITIATED`. To check for a superseded launch, use `supersededAt`. */
  status: LaunchStatus;
  /** A list of subgraph changes that are included in this launch. */
  subgraphChanges?: Maybe<Array<SubgraphChange>>;
  /** The timestamp when this launch was superseded by another launch. If an active launch is superseded, it terminates. */
  supersededAt?: Maybe<Scalars['Timestamp']['output']>;
  /** The launch that superseded this launch, if any. If an active launch is superseded, it terminates. */
  supersededBy?: Maybe<Launch>;
  /** The source variant launch that caused this launch to be initiated. This value is present only for contract variant launches. Otherwise, it's null. */
  upstreamLaunch?: Maybe<Launch>;
};


/** Represents the complete process of making a set of updates to a deployed graph variant. */
export type LaunchPreviousLaunchArgs = {
  successOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum LaunchHistoryOrder {
  CreatedAsc = 'CREATED_ASC',
  CreatedDesc = 'CREATED_DESC'
}

/** Types of results that can be associated with a `Launch` */
export type LaunchResult = ChangelogLaunchResult;

/** The timing details for the build step of a launch. */
export type LaunchSequenceBuildStep = {
  __typename?: 'LaunchSequenceBuildStep';
  /** The timestamp when the step completed. */
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** The timestamp when the step started. */
  startedAt?: Maybe<Scalars['Timestamp']['output']>;
};

/** The timing details for the completion step of a launch. */
export type LaunchSequenceCompletedStep = {
  __typename?: 'LaunchSequenceCompletedStep';
  /** The timestamp when the step (and therefore the launch) completed. */
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
};

/** The timing details for the initiation step of a launch. */
export type LaunchSequenceInitiatedStep = {
  __typename?: 'LaunchSequenceInitiatedStep';
  /** The timestamp when the step (and therefore the launch) started. */
  startedAt?: Maybe<Scalars['Timestamp']['output']>;
};

/** The timing details for the publish step of a launch. */
export type LaunchSequencePublishStep = {
  __typename?: 'LaunchSequencePublishStep';
  /** The timestamp when the step completed. */
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** The timestamp when the step started. */
  startedAt?: Maybe<Scalars['Timestamp']['output']>;
};

/** Represents the various steps that occur in sequence during a single launch. */
export type LaunchSequenceStep = LaunchSequenceBuildStep | LaunchSequenceCompletedStep | LaunchSequenceInitiatedStep | LaunchSequencePublishStep | LaunchSequenceSupersededStep;

/** The timing details for the superseded step of a launch. This step occurs only if the launch is superseded by another launch. */
export type LaunchSequenceSupersededStep = {
  __typename?: 'LaunchSequenceSupersededStep';
  /** The timestamp when the step completed, thereby ending the execution of this launch in favor of the superseding launch. */
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
};

export enum LaunchStatus {
  LaunchCompleted = 'LAUNCH_COMPLETED',
  LaunchFailed = 'LAUNCH_FAILED',
  LaunchInitiated = 'LAUNCH_INITIATED'
}

/** Key information representing the complete process of making a set of updates to a deployed graph variant. */
export type LaunchSummary = {
  __typename?: 'LaunchSummary';
  /** The timestamp when the launch was approved. */
  approvedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** Identifier of the associated build for this launch. This value is null until the build is initiated. */
  buildID?: Maybe<Scalars['ID']['output']>;
  /** The inputs provided to this launch's associated build, including subgraph schemas and contract filters. */
  buildInput: BuildInput;
  /** The timestamp when the launch completed. This value is null until the launch completes. */
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** The timestamp when the launch was initiated. */
  createdAt: Scalars['Timestamp']['output'];
  /** The ID of the launch's associated graph. */
  graphId: Scalars['String']['output'];
  /** The name of the launch's associated variant. */
  graphVariant: Scalars['String']['output'];
  /** The unique identifier for this launch. */
  id: Scalars['ID']['output'];
  /** A list of results from the completed launch. The items included in this list vary depending on whether the launch succeeded, failed, or was superseded. */
  results: Array<LaunchResult>;
  /** The launch's status. If a launch is superseded, its status remains `LAUNCH_INITIATED`. To check for a superseded launch, use `supersededAt`. */
  status: LaunchStatus;
};

/** The result/error union returned by GraphVariantMutation.linkPersistedQueryList. */
export type LinkPersistedQueryListResultOrError = ListNotFoundError | PermissionError | VariantAlreadyLinkedError;

export type LintCheckTask = CheckWorkflowTask & {
  __typename?: 'LintCheckTask';
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  graphID: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  result?: Maybe<LintResult>;
  status: CheckWorkflowTaskStatus;
  targetURL?: Maybe<Scalars['String']['output']>;
  workflow: CheckWorkflow;
};

/** A single rule violation. */
export type LintDiagnostic = {
  __typename?: 'LintDiagnostic';
  /** The schema coordinate of this diagnostic. */
  coordinate: Scalars['String']['output'];
  /** The graph's configured level for the rule. */
  level: LintDiagnosticLevel;
  /** The message describing the rule violation. */
  message: Scalars['String']['output'];
  /** The lint rule being violated. */
  rule: LintRule;
  /** The human readable position in the file of the rule violation. */
  sourceLocations: Array<Location>;
};

/** The severity level of an lint result. */
export enum LintDiagnosticLevel {
  Error = 'ERROR',
  Ignored = 'IGNORED',
  Warning = 'WARNING'
}

/** The result of linting a schema. */
export type LintResult = {
  __typename?: 'LintResult';
  /** The set of lint rule violations found in the schema. */
  diagnostics: Array<LintDiagnostic>;
  /** Stats generated from the resulting diagnostics. */
  stats: LintStats;
};

export enum LintRule {
  AllElementsRequireDescription = 'ALL_ELEMENTS_REQUIRE_DESCRIPTION',
  ContactDirectiveMissing = 'CONTACT_DIRECTIVE_MISSING',
  DefinedTypesAreUnused = 'DEFINED_TYPES_ARE_UNUSED',
  DeprecatedDirectiveMissingReason = 'DEPRECATED_DIRECTIVE_MISSING_REASON',
  DirectiveComposition = 'DIRECTIVE_COMPOSITION',
  DirectiveNamesShouldBeCamelCase = 'DIRECTIVE_NAMES_SHOULD_BE_CAMEL_CASE',
  DoesNotParse = 'DOES_NOT_PARSE',
  EnumPrefix = 'ENUM_PREFIX',
  EnumSuffix = 'ENUM_SUFFIX',
  EnumUsedAsInputWithoutSuffix = 'ENUM_USED_AS_INPUT_WITHOUT_SUFFIX',
  EnumUsedAsOutputDespiteSuffix = 'ENUM_USED_AS_OUTPUT_DESPITE_SUFFIX',
  EnumValuesShouldBeScreamingSnakeCase = 'ENUM_VALUES_SHOULD_BE_SCREAMING_SNAKE_CASE',
  FieldNamesShouldBeCamelCase = 'FIELD_NAMES_SHOULD_BE_CAMEL_CASE',
  FromSubgraphDoesNotExist = 'FROM_SUBGRAPH_DOES_NOT_EXIST',
  InconsistentArgumentPresence = 'INCONSISTENT_ARGUMENT_PRESENCE',
  InconsistentButCompatibleArgumentType = 'INCONSISTENT_BUT_COMPATIBLE_ARGUMENT_TYPE',
  InconsistentButCompatibleFieldType = 'INCONSISTENT_BUT_COMPATIBLE_FIELD_TYPE',
  InconsistentDefaultValuePresence = 'INCONSISTENT_DEFAULT_VALUE_PRESENCE',
  InconsistentDescription = 'INCONSISTENT_DESCRIPTION',
  InconsistentEntity = 'INCONSISTENT_ENTITY',
  InconsistentEnumValueForInputEnum = 'INCONSISTENT_ENUM_VALUE_FOR_INPUT_ENUM',
  InconsistentEnumValueForOutputEnum = 'INCONSISTENT_ENUM_VALUE_FOR_OUTPUT_ENUM',
  InconsistentExecutableDirectiveLocations = 'INCONSISTENT_EXECUTABLE_DIRECTIVE_LOCATIONS',
  InconsistentExecutableDirectivePresence = 'INCONSISTENT_EXECUTABLE_DIRECTIVE_PRESENCE',
  InconsistentExecutableDirectiveRepeatable = 'INCONSISTENT_EXECUTABLE_DIRECTIVE_REPEATABLE',
  InconsistentInputObjectField = 'INCONSISTENT_INPUT_OBJECT_FIELD',
  InconsistentInterfaceValueTypeField = 'INCONSISTENT_INTERFACE_VALUE_TYPE_FIELD',
  InconsistentNonRepeatableDirectiveArguments = 'INCONSISTENT_NON_REPEATABLE_DIRECTIVE_ARGUMENTS',
  InconsistentObjectValueTypeField = 'INCONSISTENT_OBJECT_VALUE_TYPE_FIELD',
  InconsistentRuntimeTypesForShareableReturn = 'INCONSISTENT_RUNTIME_TYPES_FOR_SHAREABLE_RETURN',
  InconsistentTypeSystemDirectiveLocations = 'INCONSISTENT_TYPE_SYSTEM_DIRECTIVE_LOCATIONS',
  InconsistentTypeSystemDirectiveRepeatable = 'INCONSISTENT_TYPE_SYSTEM_DIRECTIVE_REPEATABLE',
  InconsistentUnionMember = 'INCONSISTENT_UNION_MEMBER',
  InputArgumentNamesShouldBeCamelCase = 'INPUT_ARGUMENT_NAMES_SHOULD_BE_CAMEL_CASE',
  InputTypeSuffix = 'INPUT_TYPE_SUFFIX',
  InterfacePrefix = 'INTERFACE_PREFIX',
  InterfaceSuffix = 'INTERFACE_SUFFIX',
  MergedNonRepeatableDirectiveArguments = 'MERGED_NON_REPEATABLE_DIRECTIVE_ARGUMENTS',
  NoExecutableDirectiveIntersection = 'NO_EXECUTABLE_DIRECTIVE_INTERSECTION',
  NullablePathVariable = 'NULLABLE_PATH_VARIABLE',
  ObjectPrefix = 'OBJECT_PREFIX',
  ObjectSuffix = 'OBJECT_SUFFIX',
  OverriddenFieldCanBeRemoved = 'OVERRIDDEN_FIELD_CAN_BE_REMOVED',
  OverrideDirectiveCanBeRemoved = 'OVERRIDE_DIRECTIVE_CAN_BE_REMOVED',
  OverrideMigrationInProgress = 'OVERRIDE_MIGRATION_IN_PROGRESS',
  QueryDocumentDeclaration = 'QUERY_DOCUMENT_DECLARATION',
  RestyFieldNames = 'RESTY_FIELD_NAMES',
  TagDirectiveUsesUnknownName = 'TAG_DIRECTIVE_USES_UNKNOWN_NAME',
  TypeNamesShouldBePascalCase = 'TYPE_NAMES_SHOULD_BE_PASCAL_CASE',
  TypePrefix = 'TYPE_PREFIX',
  TypeSuffix = 'TYPE_SUFFIX',
  UnusedEnumType = 'UNUSED_ENUM_TYPE'
}

/** Stats generated from linting a schema against the graph's linter configuration. */
export type LintStats = {
  __typename?: 'LintStats';
  /** Total number of lint errors. */
  errorsCount: Scalars['Int']['output'];
  /** Total number of lint rules ignored. */
  ignoredCount: Scalars['Int']['output'];
  /** Total number of lint rules violated. */
  totalCount: Scalars['Int']['output'];
  /** Total number of lint warnings. */
  warningsCount: Scalars['Int']['output'];
};

/** The result of a failed call to GraphVariantMutation.linkPersistedQueryList when the specified list can't be found. */
export type ListNotFoundError = Error & {
  __typename?: 'ListNotFoundError';
  listId: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type Location = {
  __typename?: 'Location';
  end?: Maybe<Coordinate>;
  start?: Maybe<Coordinate>;
  subgraphName?: Maybe<Scalars['String']['output']>;
};

/** Level of the log entry */
export enum LogLevel {
  /** Debug log entry */
  Debug = 'DEBUG',
  /** Error log entry */
  Error = 'ERROR',
  /** Informational log entry */
  Info = 'INFO',
  /** Warning log entry */
  Warn = 'WARN'
}

/** Order log message */
export type LogMessage = {
  __typename?: 'LogMessage';
  /** Log level */
  level: LogLevel;
  /** Log message contents */
  message: Scalars['String']['output'];
  /** Timestamp in UTC */
  timestamp: Scalars['DateTime']['output'];
};

/** Input type to provide when running schema checks against multiple subgraph changes asynchronously for a federated supergraph. */
export type MultiSubgraphCheckAsyncInput = {
  /** Configuration options for the check execution. */
  config: HistoricQueryParametersInput;
  /** The GitHub context to associate with the check. */
  gitContext: GitContextInput;
  /** The graph ref of the Studio graph and variant to run checks against (such as `my-graph@current`). */
  graphRef?: InputMaybe<Scalars['ID']['input']>;
  /** The URL of the GraphQL endpoint that Apollo Sandbox introspected to obtain the proposed schema. Required if `isSandbox` is `true`. */
  introspectionEndpoint?: InputMaybe<Scalars['String']['input']>;
  /** If `true`, the check was initiated automatically by a Proposal update. */
  isProposal?: InputMaybe<Scalars['Boolean']['input']>;
  /** If `true`, the check was initiated by Apollo Sandbox. */
  isSandbox: Scalars['Boolean']['input'];
  /** The source variant that this check should use the operations check configuration from */
  sourceVariant?: InputMaybe<Scalars['String']['input']>;
  /** The changed subgraph schemas to check. */
  subgraphsToCheck: Array<InputMaybe<SubgraphSdlCheckInput>>;
  /** The user that triggered this check. If null, defaults to authContext to determine user. */
  triggeredBy?: InputMaybe<ActorInput>;
};

/** GraphQL mutations */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates an [operation collection](https://www.apollographql.com/docs/studio/explorer/operation-collections/) for a given variant, or creates a [sandbox collection](https://www.apollographql.com/docs/studio/explorer/operation-collections/#sandbox-collections) without an associated variant. This field accepts up to 200 requests per minute. This rate may be temporarily adjusted based on system conditions. */
  createOperationCollection: CreateOperationCollectionResult;
  /** Provides access to mutation fields for modifying a Studio graph with the provided ID. */
  graph?: Maybe<GraphMutation>;
  operationCollection?: Maybe<OperationCollectionMutation>;
  /** Provides access to mutation fields for modifying a an organization with the provided ID. */
  organization?: Maybe<OrganizationMutation>;
  /**
   * Provides access to mutation fields for modifying a GraphOS Schema Proposals with the provided ID. Learn more at https://www.apollographql.com/docs/graphos/delivery/schema-proposals
   * @deprecated Use GraphVariantMutation.proposal instead
   */
  proposal: ProposalMutationResult;
  /**
   * Provides access to mutation fields for modifying an Apollo user with the
   * provided ID.
   */
  user?: Maybe<UserMutation>;
};


/** GraphQL mutations */
export type MutationCreateOperationCollectionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  isSandbox: Scalars['Boolean']['input'];
  isShared: Scalars['Boolean']['input'];
  minEditRole?: InputMaybe<UserPermission>;
  name: Scalars['String']['input'];
  variantRefs?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** GraphQL mutations */
export type MutationGraphArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL mutations */
export type MutationOperationCollectionArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL mutations */
export type MutationOrganizationArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL mutations */
export type MutationProposalArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL mutations */
export type MutationUserArgs = {
  id: Scalars['ID']['input'];
};

export type NamedIntrospectionArg = {
  __typename?: 'NamedIntrospectionArg';
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/**
 * The shared fields for a named introspection type. Currently this is returned for the
 * top level value affected by a change. In the future, we may update this
 * type to be an interface, which is extended by the more specific types:
 * scalar, object, input object, union, interface, and enum
 *
 * For an in-depth look at where these types come from, see:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/659eb50d3/types/graphql/utilities/introspectionQuery.d.ts#L31-L37
 */
export type NamedIntrospectionType = {
  __typename?: 'NamedIntrospectionType';
  description?: Maybe<Scalars['String']['output']>;
  kind?: Maybe<IntrospectionTypeKind>;
  name?: Maybe<Scalars['String']['output']>;
};

/**
 * Introspection values that can be children of other types for changes, such
 * as input fields, objects in interfaces, enum values. In the future, this
 * value could become an interface to allow fields specific to the types
 * returned.
 */
export type NamedIntrospectionValue = {
  __typename?: 'NamedIntrospectionValue';
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  printedType?: Maybe<Scalars['String']['output']>;
};

/** An error that occurs when a requested object is not found. */
export type NotFoundError = Error & {
  __typename?: 'NotFoundError';
  /** The error message. */
  message: Scalars['String']['output'];
};

/** A list of saved GraphQL operations. */
export type OperationCollection = {
  __typename?: 'OperationCollection';
  /** The timestamp when the collection was created. */
  createdAt: Scalars['Timestamp']['output'];
  /** The user or other entity that created the collection. */
  createdBy?: Maybe<Identity>;
  /** The collection's description. A `null` description was never set, and empty string description was set to be empty string by a user, or other entity. */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** Whether the current user has marked the collection as a favorite. */
  isFavorite: Scalars['Boolean']['output'];
  /** Whether the collection is a [sandbox collection](https://www.apollographql.com/docs/studio/explorer/operation-collections/#sandbox-collections). */
  isSandbox: Scalars['Boolean']['output'];
  /** Whether the collection is shared across its associated organization. */
  isShared: Scalars['Boolean']['output'];
  /** The timestamp when the collection was most recently updated. */
  lastUpdatedAt: Scalars['Timestamp']['output'];
  /** The user or other entity that most recently updated the collection. */
  lastUpdatedBy?: Maybe<Identity>;
  /** The minimum role a user needs to edit this collection. Valid values: null, CONSUMER, OBSERVER, DOCUMENTER, CONTRIBUTOR, GRAPH_ADMIN. This value is always `null` if `isShared` is `false`. If `null` when `isShared` is `true`, the minimum role is `GRAPH_ADMIN`. */
  minEditRole?: Maybe<UserPermission>;
  /** The collection's name. */
  name: Scalars['String']['output'];
  /** Returns the operation in the collection with the specified ID, if any. */
  operation?: Maybe<OperationCollectionEntryResult>;
  /** A list of the GraphQL operations that belong to the collection. */
  operations: Array<OperationCollectionEntry>;
  /** The permissions that the current user has for the collection. */
  permissions: OperationCollectionPermissions;
};


/** A list of saved GraphQL operations. */
export type OperationCollectionOperationArgs = {
  id: Scalars['ID']['input'];
};

/** A saved operation entry within an Operation Collection. */
export type OperationCollectionEntry = {
  __typename?: 'OperationCollectionEntry';
  /** The timestamp when the entry was created. */
  createdAt: Scalars['Timestamp']['output'];
  /** The user or other entity that created the entry. */
  createdBy?: Maybe<Identity>;
  /** Details of the entry's associated operation, such as its `body` and `variables`. */
  currentOperationRevision: OperationCollectionEntryState;
  id: Scalars['ID']['output'];
  /** The timestamp when the entry was most recently updated. */
  lastUpdatedAt: Scalars['Timestamp']['output'];
  /** The user or other entity that most recently updated the entry. */
  lastUpdatedBy?: Maybe<Identity>;
  /** The entry's name. */
  name: Scalars['String']['output'];
  /** The entry's lexicographical ordering index within its containing collection. */
  orderingIndex: Scalars['String']['output'];
};

/** Provides fields for modifying an operation in a collection. */
export type OperationCollectionEntryMutation = {
  __typename?: 'OperationCollectionEntryMutation';
  /** Updates the name of an operation. */
  updateName?: Maybe<UpdateOperationCollectionEntryResult>;
  /** Updates the body, headers, and/or variables of an operation. */
  updateValues?: Maybe<UpdateOperationCollectionEntryResult>;
};


/** Provides fields for modifying an operation in a collection. */
export type OperationCollectionEntryMutationUpdateNameArgs = {
  name: Scalars['String']['input'];
};


/** Provides fields for modifying an operation in a collection. */
export type OperationCollectionEntryMutationUpdateValuesArgs = {
  operationInput: OperationCollectionEntryStateInput;
};

export type OperationCollectionEntryMutationResult = NotFoundError | OperationCollectionEntryMutation | PermissionError;

/** Possible return values when querying for an entry in an operation collection (either the entry object or an `Error` object). */
export type OperationCollectionEntryResult = NotFoundError | OperationCollectionEntry;

/** The most recent body, variable and header values of a saved operation entry. */
export type OperationCollectionEntryState = {
  __typename?: 'OperationCollectionEntryState';
  /** The raw body of the entry's GraphQL operation. */
  body: Scalars['String']['output'];
  /** Headers for the entry's GraphQL operation. */
  headers?: Maybe<Array<OperationHeader>>;
  /** Variables for the entry's GraphQL operation, as a JSON string. */
  variables?: Maybe<Scalars['String']['output']>;
};

/** Fields for creating or modifying an operation collection entry. */
export type OperationCollectionEntryStateInput = {
  /** The operation's query body. */
  body: Scalars['String']['input'];
  /** The operation's headers. */
  headers?: InputMaybe<Array<OperationHeaderInput>>;
  /** The operation's variables. */
  variables?: InputMaybe<Scalars['String']['input']>;
};

/** Provides fields for modifying an [operation collection](https://www.apollographql.com/docs/studio/explorer/operation-collections/). This fields on this type accepts up to 200 requests per minute combined. This rate may be temporarily adjusted based on system conditions. */
export type OperationCollectionMutation = {
  __typename?: 'OperationCollectionMutation';
  /** Adds an operation to this collection. */
  addOperation?: Maybe<AddOperationCollectionEntryResult>;
  /** Adds operations to this collection. */
  addOperations?: Maybe<AddOperationCollectionEntriesResult>;
  /** Deletes this operation collection. This also deletes all of the collection's associated operations. */
  delete?: Maybe<DeleteOperationCollectionResult>;
  /** Deletes an operation from this collection. */
  deleteOperation?: Maybe<RemoveOperationCollectionEntryResult>;
  operation?: Maybe<OperationCollectionEntryMutationResult>;
  /** Updates the minimum role a user needs to be able to modify this collection. */
  setMinEditRole?: Maybe<UpdateOperationCollectionResult>;
  /** Updates this collection's description. */
  updateDescription?: Maybe<UpdateOperationCollectionResult>;
  /** Updates whether the current user has marked this collection as a favorite. */
  updateIsFavorite?: Maybe<UpdateOperationCollectionResult>;
  /** Updates whether this collection is shared across its associated organization. */
  updateIsShared?: Maybe<UpdateOperationCollectionResult>;
  /** Updates this operation collection's name. */
  updateName?: Maybe<UpdateOperationCollectionResult>;
};


/** Provides fields for modifying an [operation collection](https://www.apollographql.com/docs/studio/explorer/operation-collections/). This fields on this type accepts up to 200 requests per minute combined. This rate may be temporarily adjusted based on system conditions. */
export type OperationCollectionMutationAddOperationArgs = {
  name: Scalars['String']['input'];
  operationInput: OperationCollectionEntryStateInput;
};


/** Provides fields for modifying an [operation collection](https://www.apollographql.com/docs/studio/explorer/operation-collections/). This fields on this type accepts up to 200 requests per minute combined. This rate may be temporarily adjusted based on system conditions. */
export type OperationCollectionMutationAddOperationsArgs = {
  operations: Array<AddOperationInput>;
};


/** Provides fields for modifying an [operation collection](https://www.apollographql.com/docs/studio/explorer/operation-collections/). This fields on this type accepts up to 200 requests per minute combined. This rate may be temporarily adjusted based on system conditions. */
export type OperationCollectionMutationDeleteOperationArgs = {
  id: Scalars['ID']['input'];
};


/** Provides fields for modifying an [operation collection](https://www.apollographql.com/docs/studio/explorer/operation-collections/). This fields on this type accepts up to 200 requests per minute combined. This rate may be temporarily adjusted based on system conditions. */
export type OperationCollectionMutationOperationArgs = {
  id: Scalars['ID']['input'];
};


/** Provides fields for modifying an [operation collection](https://www.apollographql.com/docs/studio/explorer/operation-collections/). This fields on this type accepts up to 200 requests per minute combined. This rate may be temporarily adjusted based on system conditions. */
export type OperationCollectionMutationSetMinEditRoleArgs = {
  editRole?: InputMaybe<UserPermission>;
};


/** Provides fields for modifying an [operation collection](https://www.apollographql.com/docs/studio/explorer/operation-collections/). This fields on this type accepts up to 200 requests per minute combined. This rate may be temporarily adjusted based on system conditions. */
export type OperationCollectionMutationUpdateDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
};


/** Provides fields for modifying an [operation collection](https://www.apollographql.com/docs/studio/explorer/operation-collections/). This fields on this type accepts up to 200 requests per minute combined. This rate may be temporarily adjusted based on system conditions. */
export type OperationCollectionMutationUpdateIsFavoriteArgs = {
  isFavorite: Scalars['Boolean']['input'];
};


/** Provides fields for modifying an [operation collection](https://www.apollographql.com/docs/studio/explorer/operation-collections/). This fields on this type accepts up to 200 requests per minute combined. This rate may be temporarily adjusted based on system conditions. */
export type OperationCollectionMutationUpdateIsSharedArgs = {
  isShared: Scalars['Boolean']['input'];
};


/** Provides fields for modifying an [operation collection](https://www.apollographql.com/docs/studio/explorer/operation-collections/). This fields on this type accepts up to 200 requests per minute combined. This rate may be temporarily adjusted based on system conditions. */
export type OperationCollectionMutationUpdateNameArgs = {
  name: Scalars['String']['input'];
};

/** Whether the current user can perform various actions on the associated collection. */
export type OperationCollectionPermissions = {
  __typename?: 'OperationCollectionPermissions';
  /** Whether the current user can edit operations in the associated collection. */
  canEditOperations: Scalars['Boolean']['output'];
  /** Whether the current user can delete or update the associated collection's metadata, such as its name and description. */
  canManage: Scalars['Boolean']['output'];
  /** Whether the current user can read operations in the associated collection. */
  canReadOperations: Scalars['Boolean']['output'];
};

export type OperationCollectionResult = NotFoundError | OperationCollection | PermissionError | ValidationError;

/** Saved headers on a saved operation. */
export type OperationHeader = {
  __typename?: 'OperationHeader';
  /** The header's name. */
  name: Scalars['String']['output'];
  /** The header's value. */
  value: Scalars['String']['output'];
};

export type OperationHeaderInput = {
  /** The header's name. */
  name: Scalars['String']['input'];
  /** The header's value. */
  value: Scalars['String']['input'];
};

export type OperationInfoFilter = {
  __typename?: 'OperationInfoFilter';
  id: Scalars['String']['output'];
};

export type OperationInfoFilterInput = {
  id: Scalars['String']['input'];
};

/** Operation name filter configuration for a graph. */
export type OperationNameFilter = {
  __typename?: 'OperationNameFilter';
  /** name of the operation by the user and reported alongside metrics */
  name: Scalars['String']['output'];
  version?: Maybe<Scalars['String']['output']>;
};

/** Options to filter by operation name. */
export type OperationNameFilterInput = {
  /** name of the operation set by the user and reported alongside metrics */
  name: Scalars['String']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};

export enum OperationType {
  Mutation = 'MUTATION',
  Query = 'QUERY',
  Subscription = 'SUBSCRIPTION'
}

export type OperationsCheckConfiguration = {
  __typename?: 'OperationsCheckConfiguration';
  /**
   * During operation checks, if this option is enabled, the check will not fail or
   *  mark any operations as broken/changed if the default value has changed, only
   *  if the default value is removed completely.
   */
  downgradeDefaultValueChange: Scalars['Boolean']['output'];
  /**
   * During operation checks, if this option is enabled, it evaluates a check
   * run against zero operations as a pass instead of a failure.
   */
  downgradeStaticChecks: Scalars['Boolean']['output'];
  /** During the operations check, ignore clients matching any of the <excludedClients> filters. */
  excludedClients: Array<ClientFilter>;
  /** During the operations check, ignore operations matching any of the <excludedOperationNames> filters. */
  excludedOperationNames: Array<OperationNameFilter>;
  /** During the operations check, ignore operations matching any of the <excludedOperations> filters. */
  excludedOperations: Array<OperationInfoFilter>;
  /** The start of the time range for the operations check. */
  fromNormalized: Scalars['Timestamp']['output'];
  /**
   * During the operations check, fetch operations from the metrics data for <includedVariants>
   * variants.
   */
  includedVariants: Array<Scalars['String']['output']>;
  /**
   * During the operations check, ignore operations that executed less than <operationCountThreshold>
   * times in the time range.
   */
  operationCountThreshold: Scalars['Int']['output'];
  /**
   * Duration the operations check, ignore operations that constituted less than
   * <operationCountThresholdPercentage>% of the operations in the time range.
   */
  operationCountThresholdPercentage: Scalars['Float']['output'];
  /** The end of the time range for the operations check. */
  toNormalized: Scalars['Timestamp']['output'];
};

export type OperationsCheckConfigurationOverridesInput = {
  /**
   * During the operations check, ignore clients matching any of the <excludedClients> filters.
   * Providing null will use variant- or graph-level settings instead.
   */
  excludedClients?: InputMaybe<Array<ClientFilterInput>>;
  /**
   * During the operations check, ignore operations matching any of the <excludedOperationNames>
   * filters. Providing null will use variant- or graph-level settings instead.
   */
  excludedOperationNames?: InputMaybe<Array<OperationNameFilterInput>>;
  /**
   * During the operations check, ignore operations matching any of the <excludedOperations> filters.
   * Providing null will use variant- or graph-level settings instead.
   */
  excludedOperations?: InputMaybe<Array<OperationInfoFilterInput>>;
  /**
   * The start of the time range for the operations check, expressed as an offset from the time the
   * check request is received (in seconds) or an ISO-8601 timestamp. Providing null here and
   * useMaxRetention as false will use variant- or graph-level settings instead. It is an error to
   * provide a non-null value here and useMaxRetention as true.
   */
  from?: InputMaybe<Scalars['String']['input']>;
  /**
   * During the operations check, fetch operations from the metrics data for <includedVariants>
   * variants. Providing null will use variant- or graph-level settings instead.
   */
  includedVariants?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * During the operations check, ignore operations that executed less than <operationCountThreshold>
   * times in the time range. Providing null will use variant- or graph-level settings instead.
   */
  operationCountThreshold?: InputMaybe<Scalars['Int']['input']>;
  /**
   * During the operations check, ignore operations that executed less than <operationCountThreshold>
   * times in the time range. Expected values are between 0% and 5%. Providing null will use variant-
   * or graph-level settings instead.
   */
  operationCountThresholdPercentage?: InputMaybe<Scalars['Float']['input']>;
  /**
   * The end of the time range for the operations check, expressed as an offset from the time the
   * check request is received (in seconds) or an ISO-8601 timestamp. Providing null here and
   * useMaxRetention as false will use variant- or graph-level settings instead. It is an error to
   * provide a non-null value here and useMaxRetention as true.
   */
  to?: InputMaybe<Scalars['String']['input']>;
  /**
   * During the operations check, use the maximum time range allowed by the graph's plan's retention.
   * Providing false here and from/to as null will use variant- or graph-level settings instead. It is
   * an error to provide true here and from/to as non-null.
   */
  useMaxRetention?: Scalars['Boolean']['input'];
};

export type OperationsCheckResult = {
  __typename?: 'OperationsCheckResult';
  /** Operations affected by all changes in diff */
  affectedQueries?: Maybe<Array<AffectedQuery>>;
  /** Returns an affected operation and its changes for this check */
  affectedQuery?: Maybe<AffectedQuery>;
  /** Indicates whether the changes for this operation check were truncated due to their large quantity. */
  areChangesTruncated: Scalars['Boolean']['output'];
  /** Summary/counts for all changes in diff */
  changeSummary: ChangeSummary;
  /** List of schema changes with associated affected clients and operations */
  changes: Array<Change>;
  /** Indication of the success of the change, either failure, warning, or notice. */
  checkSeverity: ChangeSeverity;
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  /** Number of affected operations that are neither marked as SAFE or IGNORED. */
  numberOfAffectedOperations: Scalars['Int']['output'];
  /** Number of operations that were validated during schema diff */
  numberOfCheckedOperations: Scalars['Int']['output'];
  /** Total number of affected operations including ones marked SAFE or IGNORED. */
  totalNumberOfAffectedOperations: Scalars['Int']['output'];
  /** Total number of schema changes, excluding any truncation. */
  totalNumberOfChanges: Scalars['Int']['output'];
};


export type OperationsCheckResultAffectedQueriesArgs = {
  filter?: InputMaybe<AffectedQueriesFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type OperationsCheckResultAffectedQueryArgs = {
  id: Scalars['ID']['input'];
};

export type OperationsCheckTask = CheckWorkflowTask & {
  __typename?: 'OperationsCheckTask';
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  graphID: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  /**
   * The result of the operations check. This will be null when the task is initializing or running,
   * or when the build task fails (which is a prerequisite task to this one).
   */
  result?: Maybe<OperationsCheckResult>;
  status: CheckWorkflowTaskStatus;
  targetURL?: Maybe<Scalars['String']['output']>;
  workflow: CheckWorkflow;
};

/** Cloud Router order */
export type Order = {
  __typename?: 'Order';
  /**
   * Completion percentage of the order (between 0 and 100)
   *
   * This will only return data for IN_PROGRESS, COMPLETED, or SUPERSEDED states
   */
  completionPercentage?: Maybe<Scalars['Int']['output']>;
  /** When this Order was created */
  createdAt: Scalars['NaiveDateTime']['output'];
  /** Order identifier */
  id: Scalars['ID']['output'];
  logs: Array<LogMessage>;
  /** Order type */
  orderType: OrderType;
  /** Reason for ERRORED or ROLLING_BACK orders */
  reason?: Maybe<Scalars['String']['output']>;
  /** Router associated with this Order */
  router: Router;
  /** Order status */
  status: OrderStatus;
  /** Last time this Order was updated */
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

/** Return an Order or an error */
export type OrderOrError = Order;

/** Represents the different status for an order */
export enum OrderStatus {
  /** Order was successfully completed */
  Completed = 'COMPLETED',
  /** Order was unsuccessful */
  Errored = 'ERRORED',
  /** New Order in progress */
  Pending = 'PENDING',
  /**
   * Order is currently rolling back
   *
   * All resources created as part of this Order are being deleted
   */
  RollingBack = 'ROLLING_BACK',
  /**
   * Order has been superseded by another, more recent order
   *
   * This can happen if two update orders arrive in close succession and we already
   * started to process the newer order first.
   */
  Superseded = 'SUPERSEDED'
}

/** Represents the different types of order */
export enum OrderType {
  /** Create a new Cloud Router */
  CreateRouter = 'CREATE_ROUTER',
  /** Destroy an existing Cloud Router */
  DestroyRouter = 'DESTROY_ROUTER',
  /** Update an existing Cloud Router */
  UpdateRouter = 'UPDATE_ROUTER'
}

export enum Ordering {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

/** An organization in Apollo Studio. Can have multiple members and graphs. */
export type Organization = {
  __typename?: 'Organization';
  auditLogExports?: Maybe<Array<AuditLogExport>>;
  /** Graphs belonging to this organization. */
  graphs: Array<Graph>;
  /** Globally unique identifier, which isn't guaranteed stable (can be changed by administrators). */
  id: Scalars['ID']['output'];
  /** The user memberships belonging to an Organization */
  memberships?: Maybe<Array<AccountMembership>>;
  /** Name of the organization, which can change over time and isn't unique. */
  name: Scalars['String']['output'];
  /**
   * Fetches an offline license for the account.
   * (If you need this then please contact your Apollo account manager to discuss your requirements.)
   */
  offlineLicense?: Maybe<RouterLicense>;
  /**
   * Graphs belonging to this organization.
   * @deprecated Use graphs field instead
   */
  services: Array<Graph>;
  /** The session length in seconds for a user in this org */
  sessionDurationInSeconds?: Maybe<Scalars['Int']['output']>;
};


/** An organization in Apollo Studio. Can have multiple members and graphs. */
export type OrganizationGraphsArgs = {
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


/** An organization in Apollo Studio. Can have multiple members and graphs. */
export type OrganizationServicesArgs = {
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OrganizationMutation = {
  __typename?: 'OrganizationMutation';
  createGraph: GraphCreationResult;
  /** Send an invitation to join the organization by E-mail */
  invite?: Maybe<AccountInvitation>;
  /** Trigger a request for an audit export */
  requestAuditExport?: Maybe<Organization>;
  /** Create or update a custom session length for an org */
  setCustomSessionLength: Scalars['Int']['output'];
  /** Update a user's role within an organization */
  updateUserRole?: Maybe<User>;
};


export type OrganizationMutationCreateGraphArgs = {
  graphType: GraphType;
  hiddenFromUninvitedNonAdmin: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  variantCreationConfig?: InputMaybe<VariantCreationConfig>;
};


export type OrganizationMutationInviteArgs = {
  email: Scalars['String']['input'];
  role?: InputMaybe<UserPermission>;
};


export type OrganizationMutationRequestAuditExportArgs = {
  actors?: InputMaybe<Array<ActorInput>>;
  from: Scalars['Timestamp']['input'];
  graphIds?: InputMaybe<Array<Scalars['String']['input']>>;
  to: Scalars['Timestamp']['input'];
};


export type OrganizationMutationSetCustomSessionLengthArgs = {
  sessionDurationInSeconds: Scalars['Int']['input'];
};


export type OrganizationMutationUpdateUserRoleArgs = {
  role: UserPermission;
  userID: Scalars['ID']['input'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type ParentChangeProposalComment = ProposalComment & {
  __typename?: 'ParentChangeProposalComment';
  createdAt: Scalars['Timestamp']['output'];
  /** null if the user is deleted */
  createdBy?: Maybe<Identity>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  /** true if the schemaCoordinate this comment is on doesn't exist in the diff between the most recent revision & the base sdl */
  outdated: Scalars['Boolean']['output'];
  replies: Array<ReplyChangeProposalComment>;
  replyCount: Scalars['Int']['output'];
  schemaCoordinate: Scalars['String']['output'];
  /** '#@!api!@#' for api schema, '#@!supergraph!@#' for supergraph schema, subgraph otherwise */
  schemaScope: Scalars['String']['output'];
  status: CommentStatus;
  /** null if never updated */
  updatedAt?: Maybe<Scalars['Timestamp']['output']>;
};

export type ParentGeneralProposalComment = GeneralProposalComment & ProposalComment & {
  __typename?: 'ParentGeneralProposalComment';
  createdAt: Scalars['Timestamp']['output'];
  /** null if the user is deleted */
  createdBy?: Maybe<Identity>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  replies: Array<ReplyGeneralProposalComment>;
  replyCount: Scalars['Int']['output'];
  status: CommentStatus;
  /** null if never updated */
  updatedAt?: Maybe<Scalars['Timestamp']['output']>;
};

/**
 * Input for registering a partial schema to an implementing service.
 * One of the fields must be specified (validated server-side).
 *
 * If a new partialSchemaSDL is passed in, this operation will store it before
 * creating the association.
 *
 * If both the sdl and hash are specified, an error will be thrown if the provided
 * hash doesn't match our hash of the sdl contents. If the sdl field is specified,
 * the hash does not need to be and will be computed server-side.
 */
export type PartialSchemaInput = {
  /**
   * Hash of the partial schema to associate; error is thrown if only the hash is
   * specified and the hash has not been seen before
   */
  hash?: InputMaybe<Scalars['String']['input']>;
  /**
   * Contents of the partial schema in SDL syntax, but may reference types
   * that aren't defined in this document
   */
  sdl?: InputMaybe<Scalars['String']['input']>;
};

/** An error that's returned when the current user doesn't have sufficient permissions to perform an action. */
export type PermissionError = Error & {
  __typename?: 'PermissionError';
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Information about the act of publishing operations to the list */
export type PersistedQueriesPublish = {
  __typename?: 'PersistedQueriesPublish';
  operationCounts: PersistedQueriesPublishOperationCounts;
};

export type PersistedQueriesPublishOperationCounts = {
  __typename?: 'PersistedQueriesPublishOperationCounts';
  /** The number of new operations added to the list by this publish. */
  added: Scalars['Int']['output'];
  /** The number of operations included in this publish whose metadata and body were unchanged from the previous list revision. */
  identical: Scalars['Int']['output'];
  /** The number of operations removed from the list by this publish. */
  removed: Scalars['Int']['output'];
  /** The number of operations in this list that were not mentioned by this publish. */
  unaffected: Scalars['Int']['output'];
  /** The number of operations whose metadata or body were changed by this publish. */
  updated: Scalars['Int']['output'];
};

/** Full identifier for an operation in a Persisted Query List. */
export type PersistedQueryIdInput = {
  /** An optional client name to associate with the operation. Two operations with the same ID but different client names are treated as distinct operations. An operation with the same ID and a null client name is treated as a distinct operation as well. */
  clientName?: InputMaybe<Scalars['String']['input']>;
  /** An opaque identifier for this operation. For a given client name, this should map uniquely to an operation body; editing the body should generally result in a new ID. Apollo's tools generally use the lowercase hex SHA256 of the operation body. */
  id: Scalars['ID']['input'];
};

/** Operations to be published to the Persisted Query List. */
export type PersistedQueryInput = {
  /** The GraphQL document for this operation, including all necessary fragment definitions. */
  body: Scalars['GraphQLDocument']['input'];
  /** An optional client name to associate with the operation. Two operations with the same ID but different client names are treated as distinct operations. */
  clientName?: InputMaybe<Scalars['String']['input']>;
  /** An opaque identifier for this operation. This should map uniquely to an operation body; editing the body should generally result in a new ID. Apollo's tools generally use the lowercase hex SHA256 of the operation body. */
  id: Scalars['ID']['input'];
  /** A name for the operation. Typically this is the name of the actual GraphQL operation in the body. This does not need to be unique within a Persisted Query List; as a client project evolves and its operations change, multiple operations with the same name (but different body and id) can be published. */
  name: Scalars['String']['input'];
  /** The operation's type. */
  type: OperationType;
};

/** A Persisted Query List for a graph. */
export type PersistedQueryList = {
  __typename?: 'PersistedQueryList';
  /** The current build of this PQL. */
  currentBuild: PersistedQueryListBuild;
  /** The immutable ID for this Persisted Query List. */
  id: Scalars['ID']['output'];
  /** All variants linked to this Persisted Query List, if any. */
  linkedVariants: Array<GraphVariant>;
  /** The list's name; can be changed and does not need to be unique. */
  name: Scalars['String']['output'];
};

/** Information about a particular revision of the list, as produced by a particular publish. */
export type PersistedQueryListBuild = {
  __typename?: 'PersistedQueryListBuild';
  /** The persisted query list that this build built. */
  list: PersistedQueryList;
  /** The chunks that made up this build. We do not commit to keeping the full contents of older revisions indefinitely, so this may be null for suitably old revisions. */
  manifestChunks?: Maybe<Array<PersistedQueryListManifestChunk>>;
  /** Information about the publish operation that created this build. */
  publish: PersistedQueriesPublish;
  /** The revision of this Persisted Query List. Revision 0 is the initial empty list; each publish increments the revision by 1. */
  revision: Scalars['Int']['output'];
  /** The total number of operations in the list after this build. Compare to PersistedQueriesPublish.operationCounts. */
  totalOperationsInList: Scalars['Int']['output'];
};

export type PersistedQueryListManifestChunk = {
  __typename?: 'PersistedQueryListManifestChunk';
  /** An immutable identifier for this particular chunk of a PQL. The contents referenced by this ID will never change. */
  id: Scalars['ID']['output'];
  /** The chunk can be downloaded from any of these URLs, which might be transient. */
  urls: Array<Scalars['String']['output']>;
};

export type PersistedQueryListMutation = {
  __typename?: 'PersistedQueryListMutation';
  /** Deletes this Persisted Query List. */
  delete: DeletePersistedQueryListResultOrError;
  /** Updates this Persisted Query List by publishing a set of operations and removing other operations. Operations not mentioned remain in the list unchanged. */
  publishOperations: PublishOperationsResultOrError;
  /** Updates the name and/or description of the specified Persisted Query List. */
  updateMetadata: UpdatePersistedQueryListMetadataResultOrError;
};


export type PersistedQueryListMutationPublishOperationsArgs = {
  allowOverwrittenOperations?: InputMaybe<Scalars['Boolean']['input']>;
  operations?: InputMaybe<Array<PersistedQueryInput>>;
  remove?: InputMaybe<Array<PersistedQueryIdInput>>;
  removeOperations?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type PersistedQueryListMutationUpdateMetadataArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** An error related to an organization's Apollo Studio plan. */
export type PlanError = {
  __typename?: 'PlanError';
  /** The error message. */
  message: Scalars['String']['output'];
};

export type Proposal = {
  __typename?: 'Proposal';
  /**
   * A list of the activities for this proposal.
   * If first and last are not specified, defaults to 25. If one is specified there is a max allowed value of 50.
   */
  activities: ProposalActivityConnection;
  /** The variant this Proposal is under the hood. */
  backingVariant: GraphVariant;
  /** Can the current user can edit THIS proposal, either by authorship or role level */
  canEditProposal: Scalars['Boolean']['output'];
  createdAt: Scalars['Timestamp']['output'];
  /**
   * null if user is deleted, or if user removed from org
   * and others in the org no longer have access to this user's info
   */
  createdBy?: Maybe<Identity>;
  /** The description of this Proposal. */
  description: Scalars['String']['output'];
  descriptionUpdatedAt?: Maybe<Scalars['Timestamp']['output']>;
  descriptionUpdatedBy?: Maybe<Identity>;
  displayName: Scalars['String']['output'];
  /** A flag indicating if changes have been detected on the source variant. Will be false if proposal was created prior to the pull upstream feature release on Nov 15, 2024. */
  hasUpstreamChanges: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  implementedChanges: Array<ProposalImplementedChange>;
  /** True if only some of the changes in this proposal are currently published to the implementation variant */
  isPartiallyImplemented: Scalars['Boolean']['output'];
  latestRevision: ProposalRevision;
  reviews: Array<ProposalReview>;
  /** The variant this Proposal was cloned/sourced from. */
  sourceVariant: GraphVariant;
  status: ProposalStatus;
  updatedAt: Scalars['Timestamp']['output'];
  updatedBy?: Maybe<Identity>;
};


export type ProposalActivitiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ProposalActivity = {
  __typename?: 'ProposalActivity';
  activity?: Maybe<ProposalActivityAction>;
  createdAt: Scalars['Timestamp']['output'];
  createdBy?: Maybe<Identity>;
  id: Scalars['ID']['output'];
  target?: Maybe<ProposalActivityTarget>;
};

export enum ProposalActivityAction {
  /** When the system changes a Proposal's status back to OPEN from APPROVED when approvals drop below min approvals. */
  ApprovalWithdrawn = 'APPROVAL_WITHDRAWN',
  /** When the system changes a Proposal's status back to OPEN from APPROVED when a change is made after a proposal or review is approved. */
  ApprovalWithdrawnOnPublish = 'APPROVAL_WITHDRAWN_ON_PUBLISH',
  /** When a user manually sets a Proposal to Close */
  CloseProposal = 'CLOSE_PROPOSAL',
  /** When a Comment is added to a Proposal. */
  CommentAdded = 'COMMENT_ADDED',
  /** When a subgraph in a Proposal is deleted. */
  DeleteSubgraph = 'DELETE_SUBGRAPH',
  /** When a diff in a Proposal publish is found to already be in the Implementation target variant that fully implements the Proposal. Status of the Proposal will change to IMPLEMENTED. */
  FullyImplementedProposalOrigin = 'FULLY_IMPLEMENTED_PROPOSAL_ORIGIN',
  /**  When a diff in an Implementation variant publish is found in a Proposal that fully implements the Proposal. Status of the Proposal will change to IMPLEMENTED. */
  FullyImplementedVariantOrigin = 'FULLY_IMPLEMENTED_VARIANT_ORIGIN',
  /** When the system changes a Proposal's status to APPROVED when the min approvals have been met. */
  MetMinApprovalsProposal = 'MET_MIN_APPROVALS_PROPOSAL',
  /** When a user manually sets a Proposal to Open */
  OpenProposal = 'OPEN_PROPOSAL',
  /** When a diff in a Proposal publish is found to already be in the Implementation target variant that partially implements the Proposal. Does not change the status of the Proposal, but isPartiallyImplemented will return true. */
  PartiallyImplementedProposalOrigin = 'PARTIALLY_IMPLEMENTED_PROPOSAL_ORIGIN',
  /** When a diff in an Implementation variant publish is found in a Proposal that partially implements the Proposal. Does not change the status of the Proposal, but isPartiallyImplemented will return true. */
  PartiallyImplementedVariantOrigin = 'PARTIALLY_IMPLEMENTED_VARIANT_ORIGIN',
  /** When a new revision is published to subgraphs in a Proposal. */
  PublishSubgraphs = 'PUBLISH_SUBGRAPHS',
  /** When a Proposal is moved to DRAFT from another status not on creation. */
  ReturnToDraftProposal = 'RETURN_TO_DRAFT_PROPOSAL',
  /** When a Review is added to a Proposal. */
  ReviewAdded = 'REVIEW_ADDED'
}

export type ProposalActivityConnection = {
  __typename?: 'ProposalActivityConnection';
  edges?: Maybe<Array<ProposalActivityEdge>>;
  nodes: Array<ProposalActivity>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ProposalActivityEdge = {
  __typename?: 'ProposalActivityEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  node?: Maybe<ProposalActivity>;
};

export type ProposalActivityTarget = ParentChangeProposalComment | ParentGeneralProposalComment | Proposal | ProposalFullImplementationProposalOrigin | ProposalFullImplementationVariantOrigin | ProposalPartialImplementationProposalOrigin | ProposalPartialImplementationVariantOrigin | ProposalReview | ProposalRevision;

export enum ProposalChangeMismatchSeverity {
  Error = 'ERROR',
  Off = 'OFF',
  Warn = 'WARN'
}

export type ProposalComment = {
  createdAt: Scalars['Timestamp']['output'];
  /** null if the user is deleted */
  createdBy?: Maybe<Identity>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  status: CommentStatus;
  /** null if never updated */
  updatedAt?: Maybe<Scalars['Timestamp']['output']>;
};

export enum ProposalCoverage {
  Full = 'FULL',
  None = 'NONE',
  Overridden = 'OVERRIDDEN',
  Partial = 'PARTIAL',
  Pending = 'PENDING'
}

export type ProposalFullImplementationProposalOrigin = {
  __typename?: 'ProposalFullImplementationProposalOrigin';
  /** the time this Proposal became implemented in the implementation target variant. */
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  /** the diff that was matched between the Proposal and the implementation target variant. TODO to deserialize this back into a DiffItem NEBULA-2726 */
  jsonDiff: Array<Scalars['String']['output']>;
  /** Revision containing a diff that fully implements this Proposal in the implementation target variant. */
  revision: ProposalRevision;
  /** the target variant this Proposal became implemented in. */
  variant: GraphVariant;
};

export type ProposalFullImplementationVariantOrigin = {
  __typename?: 'ProposalFullImplementationVariantOrigin';
  /** the time this Proposal became implemented in the implementation target variant. */
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  /** the diff that was matched between the Proposal and the implementation target variant. TODO to deserialize this back into a DiffItem NEBULA-2726 */
  jsonDiff: Array<Scalars['String']['output']>;
  /** launch containing a diff that fully implements this Proposal in the implementation target variant. null if user does not have access to launches */
  launch?: Maybe<Launch>;
  /** the target variant this Proposal became implemented in. */
  variant: GraphVariant;
};

export type ProposalImplementedChange = {
  __typename?: 'ProposalImplementedChange';
  diffItem: FlatDiffItem;
  launchId: Scalars['ID']['output'];
  subgraph: Scalars['String']['output'];
};

/** Mutations for editing GraphOS Schema Proposals. See documentation at https://www.apollographql.com/docs/graphos/delivery/schema-proposals */
export type ProposalMutation = {
  __typename?: 'ProposalMutation';
  /** The GraphOS Schema Proposal being modified by this mutation. See documentation at https://www.apollographql.com/docs/graphos/delivery/schema-proposals */
  proposal?: Maybe<Proposal>;
  /** This mutation creates a new revision of a proposal by publishing multiple subgraphs, saving the summary and recording a diff. If composition is successful, this will update running routers. See the documentation at https://www.apollographql.com/docs/graphos/delivery/schema-proposals/creation/#save-revisions This field accepts up to 500 requests per minute. This rate may be temporarily adjusted based on system conditions. */
  publishSubgraphs: PublishProposalSubgraphResult;
  /** Updates the description of this Proposal variant. Returns ValidationError if description exceeds max length of 10k characters. */
  updateDescription: UpdateProposalResult;
  /** Update the title of this proposal. This field accepts up to 200 requests per minute. This rate may be temporarily adjusted based on system conditions. */
  updateDisplayName: UpdateProposalResult;
  /** Update the list of requested reviewers for this proposal. This field accepts up to 500 requests per minute. This rate may be temporarily adjusted based on system conditions. */
  updateRequestedReviewers: UpdateRequestedReviewersResult;
  /** Update the status of this proposal. This field accepts up to 500 requests per minute. This rate may be temporarily adjusted based on system conditions. */
  updateStatus: UpdateProposalResult;
};


/** Mutations for editing GraphOS Schema Proposals. See documentation at https://www.apollographql.com/docs/graphos/delivery/schema-proposals */
export type ProposalMutationPublishSubgraphsArgs = {
  input: PublishProposalSubgraphsInput;
};


/** Mutations for editing GraphOS Schema Proposals. See documentation at https://www.apollographql.com/docs/graphos/delivery/schema-proposals */
export type ProposalMutationUpdateDescriptionArgs = {
  input: UpdateDescriptionInput;
};


/** Mutations for editing GraphOS Schema Proposals. See documentation at https://www.apollographql.com/docs/graphos/delivery/schema-proposals */
export type ProposalMutationUpdateDisplayNameArgs = {
  displayName: Scalars['String']['input'];
};


/** Mutations for editing GraphOS Schema Proposals. See documentation at https://www.apollographql.com/docs/graphos/delivery/schema-proposals */
export type ProposalMutationUpdateRequestedReviewersArgs = {
  input: UpdateRequestedReviewersInput;
};


/** Mutations for editing GraphOS Schema Proposals. See documentation at https://www.apollographql.com/docs/graphos/delivery/schema-proposals */
export type ProposalMutationUpdateStatusArgs = {
  status: ProposalStatus;
};

export type ProposalMutationResult = NotFoundError | PermissionError | ProposalMutation | ValidationError;

export type ProposalPartialImplementationProposalOrigin = {
  __typename?: 'ProposalPartialImplementationProposalOrigin';
  /** the time this Proposal became partially implemented in the implementation target variant. */
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  /** the diff that was matched between the Proposal and the implementation target variant. TODO to deserialize this back into a DiffItem NEBULA-2726 */
  jsonDiff: Array<Scalars['String']['output']>;
  /** Revision containing a diff that partially implements this Proposal in the implementation target variant. */
  revision: ProposalRevision;
  /** the target variant this Proposal became partially implemented in. */
  variant: GraphVariant;
};

export type ProposalPartialImplementationVariantOrigin = {
  __typename?: 'ProposalPartialImplementationVariantOrigin';
  /** the time this Proposal became partially implemented in the implementation target variant. */
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  /** the diff that was matched between the Proposal and the implementation target variant. TODO to deserialize this back into a DiffItem NEBULA-2726 */
  jsonDiff: Array<Scalars['String']['output']>;
  /** launch containing a diff that partially implements this Proposal in the implementation target variant. null if user does not have access to launches */
  launch?: Maybe<Launch>;
  /** the target variant this Proposal became partially implemented in. */
  variant: GraphVariant;
};

export type ProposalReview = {
  __typename?: 'ProposalReview';
  comment?: Maybe<ReviewProposalComment>;
  createdAt: Scalars['Timestamp']['output'];
  createdBy?: Maybe<Identity>;
  decision: ReviewDecision;
  id: Scalars['ID']['output'];
  isDismissed: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['Timestamp']['output']>;
  updatedBy?: Maybe<Identity>;
};

export type ProposalRevision = {
  __typename?: 'ProposalRevision';
  /** On publish, checks are triggered on a proposal automatically. However, if an error occurred triggering a check on publish, we skip attempting the check to avoid blocking the publish from succeeding. This is the only case this field would be null. */
  checkWorkflow?: Maybe<CheckWorkflow>;
  createdAt: Scalars['Timestamp']['output'];
  createdBy?: Maybe<Identity>;
  id: Scalars['ID']['output'];
  isMerge: Scalars['Boolean']['output'];
  launch?: Maybe<Launch>;
  /** Latest composition ID of the proposal's source variant at the time this revision was created. */
  mergeBaseCompositionId?: Maybe<Scalars['ID']['output']>;
  /** The schema publish of the proposal's source variant at the time this revision was created. Null if the launch is PENDING. */
  mergeBaseSchemaPublish?: Maybe<SchemaPublication>;
  /** null if this is the first revision */
  previousRevision?: Maybe<ProposalRevision>;
  /** The schema publish for this revision. Null while the launch is PENDING. */
  schemaPublish?: Maybe<SchemaPublication>;
  summary: Scalars['String']['output'];
};

export enum ProposalStatus {
  Approved = 'APPROVED',
  Closed = 'CLOSED',
  Draft = 'DRAFT',
  Implemented = 'IMPLEMENTED',
  Open = 'OPEN'
}

/** Filtering options for graph connections. */
export type ProposalVariantsFilter = {
  /** Only include proposals that were created with these variants as a base. */
  sourceVariants?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Only include proposals of a certain status. */
  status?: InputMaybe<Array<ProposalStatus>>;
  /** Only include proposals that have updated these subgraph names */
  subgraphs?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Proposal variants, limited & offset based on Service.proposalVariants & the total count */
export type ProposalVariantsResult = {
  __typename?: 'ProposalVariantsResult';
  /** The total number of proposal variants on this graph */
  totalCount: Scalars['Int']['output'];
  variants: Array<GraphVariant>;
};

export type ProposalsCheckTask = CheckWorkflowTask & {
  __typename?: 'ProposalsCheckTask';
  completedAt?: Maybe<Scalars['Timestamp']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  /** The results of this proposal check were overridden */
  didOverrideProposalsCheckTask: Scalars['Boolean']['output'];
  /** Diff items in this Check task. Will be empty list if hasExceededMaxDiffs is true. */
  diffs: Array<ProposalsCheckTaskDiff>;
  graphID: Scalars['ID']['output'];
  /** Indicates if the number of diffs in this check has exceeded the maximum allowed. null if this check was run before this field was added. */
  hasExceededMaxDiffs?: Maybe<Scalars['Boolean']['output']>;
  /** True if this Proposal check passed with warnings, otherwise false. */
  hasWarnings: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** Indicates the level of coverage a check's changeset is in approved Proposals. PENDING while Check is still running. */
  proposalCoverage: ProposalCoverage;
  /** Proposals with their state at the time the check was run associated to this check task. */
  relatedProposalResults: Array<RelatedProposalResult>;
  /** The configured severity at the time the check was run. If the check failed, this is the severity that should be shown. While this Check is PENDING defaults to Service's severityLevel. */
  severityLevel: ProposalChangeMismatchSeverity;
  status: CheckWorkflowTaskStatus;
  targetURL?: Maybe<Scalars['String']['output']>;
  workflow: CheckWorkflow;
};

/** A diff item in this Check Task and their related Proposals. */
export type ProposalsCheckTaskDiff = {
  __typename?: 'ProposalsCheckTaskDiff';
  /** A diff item in this Check Task. */
  diffItem: FlatDiffItem;
  /** If this diff item is associated with an approved Proposal. */
  hasApprovedProposal: Scalars['Boolean']['output'];
  /** Proposals associated with this diff. */
  relatedProposalResults: Array<RelatedProposalResult>;
  /** The subgraph this diff belongs to. */
  subgraph: Scalars['String']['output'];
};

/** Filtering options for list of proposals. */
export type ProposalsFilterInput = {
  /** Only include proposals that were created with these variants as a base. */
  sourceVariants?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Only include proposals of a certain status. */
  status?: InputMaybe<Array<ProposalStatus>>;
  /** Only include proposals that have updated these subgraph names */
  subgraphs?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Proposals, limited & offset based on Service.proposals & the total count */
export type ProposalsResult = {
  __typename?: 'ProposalsResult';
  /** The proposals on this graph. */
  proposals: Array<Proposal>;
  /** The total number of proposals on this graph */
  totalCount: Scalars['Int']['output'];
};

/** The result of a successful call to PersistedQueryListMutation.publishOperations. */
export type PublishOperationsResult = {
  __typename?: 'PublishOperationsResult';
  /** The build created by this publish operation. */
  build: PersistedQueryListBuild;
  /** Returns `true` if no changes were made by this publish (and no new revision was created). Otherwise, returns `false`. */
  unchanged: Scalars['Boolean']['output'];
};

/** The result/error union returned by PersistedQueryListMutation.publishOperations. */
export type PublishOperationsResultOrError = CannotModifyOperationBodyError | PermissionError | PublishOperationsResult;

export type PublishProposalSubgraphResult = NotFoundError | PermissionError | Proposal | ValidationError;

export type PublishProposalSubgraphsInput = {
  gitContext?: InputMaybe<GitContextInput>;
  previousLaunchId: Scalars['ID']['input'];
  revision: Scalars['String']['input'];
  subgraphInputs: Array<PublishSubgraphsSubgraphInput>;
  summary: Scalars['String']['input'];
};

export type PublishSubgraphsSubgraphInput = {
  activePartialSchema: PartialSchemaInput;
  name: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

/** Queries defined by this subgraph */
export type Query = {
  __typename?: 'Query';
  /** Returns the root URL of the Apollo Studio frontend. */
  frontendUrlRoot: Scalars['String']['output'];
  /** Returns details of the graph with the provided ID. */
  graph?: Maybe<Graph>;
  /** Returns details of the authenticated `User` or `Graph` executing this query. If this is an unauthenticated query (i.e., no API key is provided), this field returns null. */
  me?: Maybe<Identity>;
  /** Returns the [operation collection](https://www.apollographql.com/docs/studio/explorer/operation-collections/) for the provided ID. This field accepts up to 400 requests per minute. This rate may be temporarily adjusted based on system conditions. */
  operationCollection: OperationCollectionResult;
  /** Returns details of the Studio organization with the provided ID. */
  organization?: Maybe<Organization>;
  /** Returns a proposal by its ID. This field accepts up to 1000 requests per minute. This rate may be temporarily adjusted based on system conditions. */
  proposal?: Maybe<Proposal>;
  /** Returns details of the Apollo user with the provided ID. */
  user?: Maybe<User>;
  /** Returns details of a Studio graph variant with the provided graph ref. A graph ref has the format `graphID@variantName` (or just `graphID` for the default variant `current`). Returns null if the graph or variant doesn't exist, or if the graph isn't accessible by the current actor. */
  variant?: Maybe<GraphVariantLookup>;
};


/** Queries defined by this subgraph */
export type QueryGraphArgs = {
  id: Scalars['ID']['input'];
};


/** Queries defined by this subgraph */
export type QueryOperationCollectionArgs = {
  id: Scalars['ID']['input'];
};


/** Queries defined by this subgraph */
export type QueryOrganizationArgs = {
  id: Scalars['ID']['input'];
};


/** Queries defined by this subgraph */
export type QueryProposalArgs = {
  id: Scalars['ID']['input'];
};


/** Queries defined by this subgraph */
export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


/** Queries defined by this subgraph */
export type QueryVariantArgs = {
  ref: Scalars['ID']['input'];
};

/** An error that occurs when the rate limit on this operation has been exceeded. */
export type RateLimitExceededError = {
  __typename?: 'RateLimitExceededError';
  /** The error message. */
  message: Scalars['String']['output'];
};

/** The README documentation for a graph variant, which is displayed in Studio. */
export type Readme = {
  __typename?: 'Readme';
  /** The contents of the README in plaintext. */
  content: Scalars['String']['output'];
  /** The README's unique ID. `a15177c0-b003-4837-952a-dbfe76062eb1` for the default README */
  id: Scalars['ID']['output'];
  /** The actor that most recently updated the README (usually a `User`). `null` for the default README, or if the `User` was deleted. */
  lastUpdatedBy?: Maybe<Identity>;
  /** The timestamp when the README was most recently updated. `null` for the default README */
  lastUpdatedTime?: Maybe<Scalars['Timestamp']['output']>;
};

/** A Proposal related to a Proposal Check Task. */
export type RelatedProposalResult = {
  __typename?: 'RelatedProposalResult';
  /** The latest revision at the time the check was run, defaults to current revision if nothing found for time of the check. */
  latestRevisionAtCheck: ProposalRevision;
  /** The Proposal related to the check. State may have changed since the Check was run. */
  proposal: Proposal;
  /** The status of the Proposal at the time the check was run, defaults to current state if nothing found for time of the check. */
  statusAtCheck: ProposalStatus;
};

export type RemoveOperationCollectionEntryResult = OperationCollection | PermissionError;

export type ReplyChangeProposalComment = ProposalComment & {
  __typename?: 'ReplyChangeProposalComment';
  createdAt: Scalars['Timestamp']['output'];
  /** null if the user is deleted */
  createdBy?: Maybe<Identity>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  /** true if the schemaCoordinate this comment is on doesn't exist in the diff between the most recent revision & the base sdl */
  outdated: Scalars['Boolean']['output'];
  schemaCoordinate: Scalars['String']['output'];
  /** '#@!api!@#' for api schema, '#@!supergraph!@#' for supergraph schema, subgraph otherwise */
  schemaScope: Scalars['String']['output'];
  status: CommentStatus;
  /** null if never updated */
  updatedAt?: Maybe<Scalars['Timestamp']['output']>;
};

export type ReplyGeneralProposalComment = GeneralProposalComment & ProposalComment & {
  __typename?: 'ReplyGeneralProposalComment';
  createdAt: Scalars['Timestamp']['output'];
  /** null if the user is deleted */
  createdBy?: Maybe<Identity>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  status: CommentStatus;
  /** null if never updated */
  updatedAt?: Maybe<Scalars['Timestamp']['output']>;
};

export type RerunAsyncInput = {
  sourceVariant?: InputMaybe<Scalars['String']['input']>;
};

export enum ReviewDecision {
  Approved = 'APPROVED',
  NotApproved = 'NOT_APPROVED'
}

export type ReviewProposalComment = ProposalComment & {
  __typename?: 'ReviewProposalComment';
  createdAt: Scalars['Timestamp']['output'];
  /** null if the user is deleted */
  createdBy?: Maybe<Identity>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  status: CommentStatus;
  /** null if never updated */
  updatedAt?: Maybe<Scalars['Timestamp']['output']>;
};

export type Router = {
  __typename?: 'Router';
  /** Date when the Cloud Router was created */
  createdAt: Scalars['NaiveDateTime']['output'];
  /**
   * Custom URLs that can be used to reach the Cloud Router
   *
   * This will be null if the Cloud Router is in a deleted status or does not support custom
   * domains.
   * @deprecated use Router.endpoints instead
   */
  customDomains?: Maybe<Array<Scalars['String']['output']>>;
  /** Set of endpoints that can be used to reach a Cloud Router */
  endpoints: RouterEndpoints;
  /**
   * Number of Graph Compute Units (GCUs) associated with this Cloud Router
   *
   * This value is not present for Cloud Routers on the `SERVERLESS` tier.
   */
  gcus?: Maybe<Scalars['Int']['output']>;
  /** Return the GraphVariant associated with this Router */
  graphVariant?: Maybe<GraphVariant>;
  /**
   * Cloud Router version applied for the next launch
   *
   * If this value is not null, any subsequent launch will use this version instead of the
   * current one. This can happen when a new STABLE version is available, but we could not
   * automatically update this Cloud Router, for example due to configuration issues.
   */
  nextRouterVersion?: Maybe<RouterVersion>;
  /** Retrieves a specific Order related to this Cloud Router */
  order?: Maybe<Order>;
  /** Retrieves all Orders related to this Cloud Router */
  orders: Array<Order>;
  /**
   * URL where the Cloud Router can be found
   *
   * This will be null if the Cloud Router is in a deleted status
   * @deprecated use Router.endpoints instead
   */
  routerUrl?: Maybe<Scalars['String']['output']>;
  /**
   * Current version of the Cloud Router
   *
   * This will be null if the Cloud Router is in a deleted status.
   */
  routerVersion?: Maybe<RouterVersion>;
  /** Return the list of secrets for this Cloud Router with their hash values */
  secrets: Array<Secret>;
  /** Current status of the Cloud Router */
  status: RouterStatus;
  /**
   * Last time when the Cloud Router was updated
   *
   * If the Cloud Router was never updated, this value will be null
   */
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};


export type RouterOrderArgs = {
  orderId: Scalars['ID']['input'];
};


export type RouterOrdersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Router configuration input */
export type RouterConfigInput = {
  /**
   * Number of GCUs allocated for the Cloud Router
   *
   * This is ignored for serverless Cloud Routers
   */
  gcus?: InputMaybe<Scalars['Int']['input']>;
  /** Graph composition ID, also known as launch ID */
  graphCompositionId?: InputMaybe<Scalars['String']['input']>;
  /** Configuration for the Cloud Router */
  routerConfig?: InputMaybe<Scalars['String']['input']>;
  /** Router version for the Cloud Router */
  routerVersion?: InputMaybe<Scalars['String']['input']>;
};

/**
 * List of endpoints for Cloud Router
 *
 * ## Endpoint states
 *
 * If a Router is in the `DELETED` state, all the fields on this object will return `null`.
 *
 * For all other states, this table list all the possible valid states, and the mutations that can
 * be performed on them.
 *
 * | Default Enabled? | Primary Endpoint | Custom Endpoints | Allowed endpoint mutations                                           |
 * | Yes              | Default          | null             | N/A (this Router does not support custom endpoints)                  |
 * | Yes              | Default          | []               | addCustomDomain, enableDefaultEndpoint, resetPrimaryEndpoint         |
 * | Yes              | Default          | ["1", "2", "3"]  | addCustomDomain, enableDefaultEndpoint, removeCustomDomain("1", "2", or "3"), resetPrimaryEndpoint, setPrimaryEndpoint ("1", "2", or "3") |
 * | Yes              | Custom 1         | ["1", "2", "3"]  | addCustomDomain, disableDefaultEndpoint, enableDefaultEndpoint, removeCustomDomain("2" or "3"), resetPrimaryEndpoint, setPrimaryEndpoint ("1", "2", or "3") |
 * | No               | Custom 1         | ["1", "2", "3"]  | addCustomDomain, disableDefaultEndpoint, enableDefaultEndpoint, removeCustomDomain("2" or "3"), setPrimaryEndpoint ("1", "2", or "3") |
 */
export type RouterEndpoints = {
  __typename?: 'RouterEndpoints';
  /**
   * Set of custom Cloud Router endpoints
   *
   * This is null if the cloud router is in a deleted state, or if it does not support
   * custom endpoints.
   */
  custom?: Maybe<Array<Scalars['String']['output']>>;
  /**
   * Default Cloud Router endpoint
   *
   * This is null if the cloud router is in a deleted state.
   */
  default?: Maybe<Scalars['String']['output']>;
  /**
   * Whether the default Cloud Router endpoint is enabled
   *
   * If the default endpoint is not enabled (`false`), this Cloud Router cannot receive traffic
   * on the default endpoint.
   *
   * This is null if the cloud router is in a deleted state.
   */
  defaultEnabled?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Primary Cloud Router endpoint
   *
   * This is null if the cloud router is in a deleted state.
   */
  primary?: Maybe<Scalars['String']['output']>;
};

/** Represents the possible outcomes of an endpoint mutation */
export type RouterEndpointsResult = InternalServerError | InvalidInputErrors | RouterEndpointsSuccess;

/** Successe branch of  an addEndpoint or removeEndpoint mutation */
export type RouterEndpointsSuccess = {
  __typename?: 'RouterEndpointsSuccess';
  endpoints: RouterEndpoints;
};

/** Represents the possible outcomes of a setGcus mutation */
export type RouterGcusResult = InternalServerError | InvalidInputErrors | RouterGcusSuccess;

/** Success branch of a setGcus mutation */
export type RouterGcusSuccess = {
  __typename?: 'RouterGcusSuccess';
  order: Order;
};

export type RouterLicense = {
  __typename?: 'RouterLicense';
  /** RFC 8037 Ed25519 JWT signed representation of sibling fields. Restricted to internal services only. */
  jwt: Scalars['String']['output'];
};

export type RouterMutation = {
  __typename?: 'RouterMutation';
  /** Add a custom domain for this Cloud Router */
  addCustomDomain: RouterEndpointsResult;
  /** Remove a custom domain for this Cloud Router */
  removeCustomDomain: RouterEndpointsResult;
  /** Set the number of GCUs associated with this Router */
  setGcus: RouterGcusResult;
  /** Set secrets for this Cloud Router */
  setSecrets: RouterSecretsResult;
};


export type RouterMutationAddCustomDomainArgs = {
  customDomain: Scalars['String']['input'];
};


export type RouterMutationRemoveCustomDomainArgs = {
  customDomain: Scalars['String']['input'];
};


export type RouterMutationSetGcusArgs = {
  gcus: Scalars['Int']['input'];
};


export type RouterMutationSetSecretsArgs = {
  input: RouterSecretsInput;
};

/** User input for a RouterSecrets mutation */
export type RouterSecretsInput = {
  /** Secrets to create or update */
  secrets?: InputMaybe<Array<SecretInput>>;
  /** Secrets to remove */
  unsetSecrets?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Represents the possible outcomes of a RouterSecrets mutation */
export type RouterSecretsResult = InternalServerError | InvalidInputErrors | RouterSecretsSuccess;

/** Success branch of a RouterSecrets mutation. */
export type RouterSecretsSuccess = {
  __typename?: 'RouterSecretsSuccess';
  secrets: Array<Secret>;
};

/** Current status of Cloud Routers */
export enum RouterStatus {
  /** Cloud Router is not yet provisioned */
  Creating = 'CREATING',
  /** Router has been deleted */
  Deleted = 'DELETED',
  /**
   * Cloud Router is running, but currently being deleted
   *
   * This is the only mutation state that doesn't support rollback. If we fail to
   * delete a Router, the workflows are configured to stop and keep the router into
   * the Deleting status.
   */
  Deleting = 'DELETING',
  /**
   * Current order is rolling back to the last known good state
   *
   * After a RollingBack state, a Router can move either into Running state (from a
   * Update order) or Deleted (from a Create order).
   *
   * If we fail to roll back, the workflows are configured to stop and keep the router
   * into the RollingBack status.
   */
  RollingBack = 'ROLLING_BACK',
  /** Current router is running and able to server requests */
  Running = 'RUNNING',
  /** Router has been put to sleep. This state should only be possible for Serverless routers */
  Sleeping = 'SLEEPING',
  /** Cloud Router is running, but currently being updated */
  Updating = 'UPDATING'
}

export type RouterUpsertFailure = {
  __typename?: 'RouterUpsertFailure';
  message: Scalars['String']['output'];
};

/** Router Version */
export type RouterVersion = {
  __typename?: 'RouterVersion';
  /** Build number */
  build: Scalars['String']['output'];
  /** JSON schema for validating the router configuration for this router version */
  configSchema: Scalars['String']['output'];
  /** Config version for this router version */
  configVersion: Scalars['String']['output'];
  /** Core version identifier */
  core: Scalars['String']['output'];
  /** Status of a router version */
  status: Status;
  /** Version identifier */
  version: Scalars['String']['output'];
};

/** A GraphQL schema document and associated metadata. */
export type Schema = {
  __typename?: 'Schema';
  /** The GraphQL schema document. */
  document: Scalars['GraphQLDocument']['output'];
  /** The GraphQL schema document's SHA256 hash, represented as a hexadecimal string. */
  hash: Scalars['ID']['output'];
};

/** An error that occurred while running schema composition on a set of subgraph schemas. */
export type SchemaCompositionError = {
  __typename?: 'SchemaCompositionError';
  /** A machine-readable error code. */
  code?: Maybe<Scalars['String']['output']>;
  /** Source locations related to the error. */
  locations: Array<Maybe<SourceLocation>>;
  /** A human-readable message describing the error. */
  message: Scalars['String']['output'];
};

/** The result of computing the difference between two schemas, usually as part of schema checks. */
export type SchemaDiff = {
  __typename?: 'SchemaDiff';
  /** Operations affected by all changes in the diff. */
  affectedQueries?: Maybe<Array<AffectedQuery>>;
  /** Numeric summaries for each type of change in the diff. */
  changeSummary: ChangeSummary;
  /** A list of all schema changes in the diff, including their severity. */
  changes: Array<Change>;
  /** The number of GraphQL operations affected by the diff's changes that are neither marked as safe nor ignored. */
  numberOfAffectedOperations: Scalars['Int']['output'];
  /** The number of GraphQL operations that were validated during the check. */
  numberOfCheckedOperations?: Maybe<Scalars['Int']['output']>;
  /** Indicates the overall safety of the changes included in the diff, based on operation history (e.g., `FAILURE` or `NOTICE`). */
  severity: ChangeSeverity;
};

/** Contains details for an individual publication of an individual graph variant. */
export type SchemaPublication = {
  __typename?: 'SchemaPublication';
  /** The result of federated composition executed for this publication. This result includes either a supergraph schema or error details, depending on whether composition succeeded. This value is null when the publication is for a non-federated graph. */
  compositionResult?: Maybe<CompositionResult>;
  /** A schema diff comparing against the schema from the most recent previous successful publication. */
  diffToPrevious?: Maybe<SchemaDiff>;
  /** The timestamp when the variant was published to. */
  publishedAt: Scalars['Timestamp']['output'];
  /** The schema that was published to the variant. */
  schema: Schema;
  /** The variant that was published to." */
  variant: GraphVariant;
};

/** Describes the result of publishing a schema to a graph variant. */
export type SchemaPublicationResult = {
  __typename?: 'SchemaPublicationResult';
  /** A machine-readable response code that indicates the type of result (e.g., `UPLOAD_SUCCESS` or `NO_CHANGES`) */
  code: Scalars['String']['output'];
  /** A Human-readable message describing the type of result. */
  message: Scalars['String']['output'];
  /** If the publish operation succeeded, this contains its details. Otherwise, this is null. */
  publication?: Maybe<SchemaPublication>;
  /** Whether the schema publish operation succeeded (`true`) or encountered errors (`false`). */
  success: Scalars['Boolean']['output'];
};

/** Cloud Router secret */
export type Secret = {
  __typename?: 'Secret';
  /** When the secret was created */
  createdAt: Scalars['DateTime']['output'];
  /** Hash of the secret */
  hash: Scalars['String']['output'];
  /** Name of the secret */
  name: Scalars['String']['output'];
};

/** Input for creating or updating secrets */
export type SecretInput = {
  /** Name of the secret */
  name: Scalars['String']['input'];
  /**
   * Value for that secret
   *
   * This can only be used for input, as it is not possible to retrieve the value of secrets.
   */
  value: Scalars['String']['input'];
};

export type SemanticChange = {
  __typename?: 'SemanticChange';
  /** Target arg of change made. */
  argNode?: Maybe<NamedIntrospectionArg>;
  /**
   * Node related to the top level node that was changed, such as a field in an object,
   * a value in an enum or the object of an interface
   */
  childNode?: Maybe<NamedIntrospectionValue>;
  /** Semantic metadata about the type of change */
  definition: ChangeDefinition;
  /** Top level node affected by the change */
  parentNode?: Maybe<NamedIntrospectionType>;
  /** Short description of the change */
  shortDescription?: Maybe<Scalars['String']['output']>;
};

export type SetCustomCheckConfigurationInput = {
  secretToken?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

/** A location in a source code file. */
export type SourceLocation = {
  __typename?: 'SourceLocation';
  /** Column number. */
  column: Scalars['Int']['output'];
  /** Line number. */
  line: Scalars['Int']['output'];
};

/** Possible status of a Cloud Router version */
export enum Status {
  /**
   * Deprecated version of a Cloud Router
   *
   * New Cloud Routers should not use this version, and this will not be
   * supported at some point in the future.
   */
  Deprecated = 'DEPRECATED',
  /**
   * Upcoming or experimental version of a Cloud Router
   *
   * This should only be used internally, or to preview new features to
   * customers.
   */
  Next = 'NEXT',
  /** Cloud Router Version is ready to be used by end users */
  Stable = 'STABLE'
}

/** A subgraph in a federated Studio supergraph. */
export type Subgraph = {
  __typename?: 'Subgraph';
  /** The subgraph schema document's SHA256 hash, represented as a hexadecimal string. */
  hash: Scalars['String']['output'];
  /** The subgraph's registered name. */
  name: Scalars['String']['output'];
  /** The number of fields in this subgraph */
  numberOfFields?: Maybe<Scalars['Int']['output']>;
  /** The number of types in this subgraph */
  numberOfTypes?: Maybe<Scalars['Int']['output']>;
  /** The revision string of this publish if provided */
  revision?: Maybe<Scalars['String']['output']>;
  /** The subgraph's routing URL, provided to gateways that use managed federation. */
  routingURL: Scalars['String']['output'];
  /** Timestamp of when the subgraph was published. */
  updatedAt?: Maybe<Scalars['Timestamp']['output']>;
};

/** A change made to a subgraph as part of a launch. */
export type SubgraphChange = {
  __typename?: 'SubgraphChange';
  /** The subgraph's name. */
  name: Scalars['ID']['output'];
  /** The type of change that was made. */
  type: SubgraphChangeType;
};

export enum SubgraphChangeType {
  Addition = 'ADDITION',
  Deletion = 'DELETION',
  Modification = 'MODIFICATION'
}

/** Input type to provide when running schema checks asynchronously for a federated supergraph. */
export type SubgraphCheckAsyncInput = {
  /** Configuration options for the check execution. */
  config: HistoricQueryParametersInput;
  /** The GitHub context to associate with the check. */
  gitContext: GitContextInput;
  /** The graph ref of the Studio graph and variant to run checks against (such as `my-graph@current`). */
  graphRef?: InputMaybe<Scalars['ID']['input']>;
  /** The URL of the GraphQL endpoint that Apollo Sandbox introspected to obtain the proposed schema. Required if `isSandbox` is `true`. */
  introspectionEndpoint?: InputMaybe<Scalars['String']['input']>;
  /** If `true`, the check was initiated automatically by a Proposal update. */
  isProposal?: InputMaybe<Scalars['Boolean']['input']>;
  /** If `true`, the check was initiated by Apollo Sandbox. */
  isSandbox: Scalars['Boolean']['input'];
  /** The proposed subgraph schema to perform checks with. */
  proposedSchema: Scalars['GraphQLDocument']['input'];
  /** The name of the subgraph to check schema changes for. */
  subgraphName: Scalars['String']['input'];
};

export type SubgraphInput = {
  /** We are either going to pass in a document or a schema reference */
  document?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  routingURL: Scalars['String']['input'];
  /**
   * Reference to a schema in studio.
   * If this is a mutable ref i.e. graphRef then it will link (tbd)
   * If it is a stable ref i.e. hash then it
   */
  schemaRef?: InputMaybe<Scalars['String']['input']>;
};

/** The result of supergraph composition that Studio performed in response to an attempted publish of a subgraph. */
export type SubgraphPublicationResult = {
  __typename?: 'SubgraphPublicationResult';
  /** The generated composition config, or null if any errors occurred. */
  compositionConfig?: Maybe<CompositionConfig>;
  /** A list of errors that occurred during composition. Errors mean that Apollo was unable to compose the graph variant's subgraphs into a supergraph schema. If any errors are present, gateways / routers are not updated. */
  errors: Array<Maybe<SchemaCompositionError>>;
  /** The Launch result part of this subgraph publish. */
  launch?: Maybe<Launch>;
  /** Human-readable text describing the launch result of the subgraph publish. */
  launchCliCopy?: Maybe<Scalars['String']['output']>;
  /** The URL of the Studio page for this update's associated launch, if available. */
  launchUrl?: Maybe<Scalars['String']['output']>;
  /** All subgraphs that were created from this mutation */
  subgraphsCreated: Array<Scalars['String']['output']>;
  /** All subgraphs that were updated from this mutation */
  subgraphsUpdated: Array<Scalars['String']['output']>;
  /** Whether this composition result resulted in a new supergraph schema passed to Uplink (`true`), or the build failed for any reason (`false`). For dry runs, this value is `true` if Uplink _would have_ been updated with the result. */
  updatedGateway: Scalars['Boolean']['output'];
  /** Whether a new subgraph was created as part of this publish. */
  wasCreated: Scalars['Boolean']['output'];
  /** Whether an implementingService was updated as part of this mutation */
  wasUpdated: Scalars['Boolean']['output'];
};

/** The result of supergraph composition that Studio performed in response to an attempted deletion of a subgraph. */
export type SubgraphRemovalResult = {
  __typename?: 'SubgraphRemovalResult';
  /** A list of errors that occurred during composition. Errors mean that Apollo was unable to compose the graph variant's subgraphs into a supergraph schema. If any errors are present, gateways / routers are not updated. */
  errors: Array<Maybe<SchemaCompositionError>>;
  /** Whether this composition result resulted in a new supergraph schema passed to Uplink (`true`), or the build failed for any reason (`false`). For dry runs, this value is `true` if Uplink _would have_ been updated with the result. */
  updatedGateway: Scalars['Boolean']['output'];
};

/** The schema for a single published subgraph in Studio. */
export type SubgraphSchema = {
  __typename?: 'SubgraphSchema';
  /** The subgraph schema document as SDL. */
  sdl: Scalars['String']['output'];
};

export type SubgraphSdlCheckInput = {
  name: Scalars['String']['input'];
  sdl: Scalars['GraphQLDocument']['input'];
};

export type TaskError = {
  __typename?: 'TaskError';
  message: Scalars['String']['output'];
};

export type TopOperationRecord = {
  __typename?: 'TopOperationRecord';
  /** The graph this operation was reported from. */
  graphId: Scalars['String']['output'];
  /** The graph variant this operation was reported from. */
  graphVariant: Scalars['String']['output'];
  /** The operation name or null if the operation is unnamed. */
  name?: Maybe<Scalars['String']['output']>;
  /** The unique id for this operation. */
  operationId: Scalars['String']['output'];
  /** The total number of requests for this operation for the specified time range. */
  requestCount: Scalars['Long']['output'];
  /** The operation's signature body or null if the signature is unavailable due to parse errors. */
  signature?: Maybe<Scalars['String']['output']>;
  /** The operation type or null if the operation type could not be determined from the signature. */
  type?: Maybe<OperationType>;
};

export enum TopOperationsReportOrderByColumn {
  RequestCount = 'REQUEST_COUNT'
}

export type TopOperationsReportOrderByInput = {
  /** The order column used for the operation results. Defaults to ordering by total request count. */
  column: TopOperationsReportOrderByColumn;
  /** The direction used to order operation results. Defaults to descending order. */
  direction: Ordering;
};

export type TopOperationsReportVariantFilterInInput = {
  clientName?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  clientVersion?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TopOperationsReportVariantFilterInput = {
  in: TopOperationsReportVariantFilterInInput;
};

/** Counts of changes. */
export type TotalChangeSummaryCounts = {
  __typename?: 'TotalChangeSummaryCounts';
  /**
   * Number of changes that are additions. This includes adding types, adding fields to object, input
   * object, and interface types, adding values to enums, adding members to interfaces and unions, and
   * adding arguments.
   */
  additions: Scalars['Int']['output'];
  /** Number of changes that are new usages of the @deprecated directive. */
  deprecations: Scalars['Int']['output'];
  /**
   * Number of changes that are edits. This includes types changing kind, fields and arguments
   * changing type, arguments changing default value, and any description changes. This also includes
   * edits to @deprecated reason strings.
   */
  edits: Scalars['Int']['output'];
  /**
   * Number of changes that are removals. This includes removing types, removing fields from object,
   * input object, and interface types, removing values from enums, removing members from interfaces
   * and unions, and removing arguments. This also includes removing @deprecated usages.
   */
  removals: Scalars['Int']['output'];
};

/** Counts of changes at the type level, including interfaces, unions, enums, scalars, input objects, etc. */
export type TypeChangeSummaryCounts = {
  __typename?: 'TypeChangeSummaryCounts';
  /** Number of changes that are additions of types. */
  additions: Scalars['Int']['output'];
  /**
   * Number of changes that are edits. This includes types changing kind and any type description
   * changes, but also includes adding/removing values from enums, adding/removing members from
   * interfaces and unions, and any enum value deprecation and description changes.
   */
  edits: Scalars['Int']['output'];
  /** Number of changes that are removals of types. */
  removals: Scalars['Int']['output'];
};

/** The result/error union returned by GraphVariantMutation.unlinkPersistedQueryList. */
export type UnlinkPersistedQueryListResultOrError = PermissionError | VariantAlreadyUnlinkedError;

/** Input to update a proposal description */
export type UpdateDescriptionInput = {
  /** A proposal description */
  description: Scalars['String']['input'];
};

export type UpdateOperationCollectionEntryResult = OperationCollectionEntry | PermissionError | ValidationError;

export type UpdateOperationCollectionResult = OperationCollection | PermissionError | ValidationError;

/** The result of a successful call to PersistedQueryListMutation.updateMetadata. */
export type UpdatePersistedQueryListMetadataResult = {
  __typename?: 'UpdatePersistedQueryListMetadataResult';
  persistedQueryList: PersistedQueryList;
};

/** The result/error union returned by PersistedQueryListMutation.updateMetadata. */
export type UpdatePersistedQueryListMetadataResultOrError = PermissionError | UpdatePersistedQueryListMetadataResult;

export type UpdateProposalResult = PermissionError | Proposal | ValidationError;

export type UpdateRequestedReviewersInput = {
  reviewerUserIdsToAdd?: InputMaybe<Array<Scalars['ID']['input']>>;
  reviewerUserIdsToRemove?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateRequestedReviewersResult = PermissionError | Proposal | ValidationError;

export type UpsertRouterResult = GraphVariant | RouterUpsertFailure;

/** A registered Apollo Studio user. */
export type User = Identity & {
  __typename?: 'User';
  /** Returns a list of all active user API keys for the user. */
  apiKeys: Array<UserApiKey>;
  /** Returns a representation of this user as an `Actor` type. Useful when determining which actor (usually a `User` or `Graph`) performed a particular action in Studio. */
  asActor: Actor;
  /** The user's unique ID. */
  id: Scalars['ID']['output'];
  /** A list of the user's memberships in Apollo Studio organizations. */
  memberships: Array<UserMembership>;
  /** The user's first and last name. */
  name: Scalars['String']['output'];
};


/** A registered Apollo Studio user. */
export type UserApiKeysArgs = {
  includeCookies?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * Represents a user API key, which has permissions identical to
 * its associated Apollo user.
 */
export type UserApiKey = ApiKey & {
  __typename?: 'UserApiKey';
  /** The API key's ID. */
  id: Scalars['ID']['output'];
  /** The API key's name, for distinguishing it from other keys. */
  keyName?: Maybe<Scalars['String']['output']>;
  /** The value of the API key. **This is a secret credential!** */
  token: Scalars['String']['output'];
};

/** A single user's membership in a single Apollo Studio organization. */
export type UserMembership = {
  __typename?: 'UserMembership';
  /** The organization that the user belongs to. */
  account: Organization;
  /** The timestamp when the user was added to the organization. */
  createdAt: Scalars['Timestamp']['output'];
  /**
   * The user's permission level within the organization.
   * @deprecated Use role instead.
   */
  permission: UserPermission;
  /** The user's role within the organization'. */
  role: UserPermission;
  /** The user that belongs to the organization. */
  user: User;
};

export type UserMutation = {
  __typename?: 'UserMutation';
  /** Hard deletes the associated user. Throws an error otherwise with reason included. */
  hardDelete?: Maybe<Scalars['Void']['output']>;
  /** Creates a new user API key for this user. */
  newKey: UserApiKey;
  /**
   * If this user has no active user API keys, this creates one for the user.
   * If this user has at least one active user API key, this returns one of those keys at random and does _not_ create a new key.
   */
  provisionKey?: Maybe<ApiKeyProvision>;
  /** Deletes the user API key with the provided ID, if any. */
  removeKey?: Maybe<Scalars['Void']['output']>;
  /** Sets a new name for the user API key with the provided ID, if any. This does not invalidate the key or change its value. */
  renameKey?: Maybe<UserApiKey>;
};


export type UserMutationNewKeyArgs = {
  keyName: Scalars['String']['input'];
};


export type UserMutationProvisionKeyArgs = {
  keyName?: Scalars['String']['input'];
};


export type UserMutationRemoveKeyArgs = {
  id: Scalars['ID']['input'];
};


export type UserMutationRenameKeyArgs = {
  id: Scalars['ID']['input'];
  newKeyName?: InputMaybe<Scalars['String']['input']>;
};

export enum UserPermission {
  BillingManager = 'BILLING_MANAGER',
  Consumer = 'CONSUMER',
  Contributor = 'CONTRIBUTOR',
  Documenter = 'DOCUMENTER',
  GraphAdmin = 'GRAPH_ADMIN',
  LegacyGraphKey = 'LEGACY_GRAPH_KEY',
  Observer = 'OBSERVER',
  OrgAdmin = 'ORG_ADMIN',
  PersistedQueryPublisher = 'PERSISTED_QUERY_PUBLISHER'
}

/** An error that occurs when an operation contains invalid user input. */
export type ValidationError = Error & {
  __typename?: 'ValidationError';
  /** The error's details. */
  message: Scalars['String']['output'];
};

/** The result of a failed call to GraphVariantMutation.linkPersistedQueryList when the specified list is already linked. */
export type VariantAlreadyLinkedError = Error & {
  __typename?: 'VariantAlreadyLinkedError';
  message: Scalars['String']['output'];
};

/** The result of a failed call to GraphVariantMutation.unlinkPersistedQueryList when the specified list isn't linked. */
export type VariantAlreadyUnlinkedError = Error & {
  __typename?: 'VariantAlreadyUnlinkedError';
  message: Scalars['String']['output'];
};

/** Variant-level configuration of checks. */
export type VariantCheckConfiguration = {
  __typename?: 'VariantCheckConfiguration';
  /** Time when the check configuration was created. */
  createdAt: Scalars['Timestamp']['output'];
  customChecksConfig: VariantCheckConfigurationCustomChecks;
  /** Operation checks configuration that allows associated checks to be downgraded from failure to passing. */
  downgradeChecksConfig: VariantCheckConfigurationDowngradeChecks;
  /**
   * Downstream checks configuration for which downstream variants should affect this variant's check
   * status.
   */
  downstreamVariantsConfig: VariantCheckConfigurationDownstreamVariants;
  /** Operation checks configuration for which clients to ignore. */
  excludedClientsConfig: VariantCheckConfigurationExcludedClients;
  /** Operation checks configuration for which operation to ignore. */
  excludedOperationsConfig: VariantCheckConfigurationExcludedOperations;
  /** Graph that this check configuration belongs to */
  graphID: Scalars['String']['output'];
  /** Graph variant that this check configuration belongs to */
  graphVariant: Scalars['String']['output'];
  /** ID of the check configuration */
  id: Scalars['ID']['output'];
  /** Operation checks configuration for which variants' metrics data to include. */
  includedVariantsConfig: VariantCheckConfigurationIncludedVariants;
  /** Whether operations checks are enabled. */
  operationsChecksEnabled: Scalars['Boolean']['output'];
  /** How submitted build input diffs are handled when they match (or don't) a Proposal at the variant level */
  proposalChangeMismatchSeverityConfig: VariantCheckConfigurationProposalChangeMismatchSeverity;
  /** Operation checks configuration for time range and associated thresholds. */
  timeRangeConfig: VariantCheckConfigurationTimeRange;
  /** Time when the check configuration was updated. */
  updatedAt: Scalars['Timestamp']['output'];
  /** Identity of the last actor to update the check configuration, if available. */
  updatedBy?: Maybe<Identity>;
};

export type VariantCheckConfigurationCustomChecks = {
  __typename?: 'VariantCheckConfigurationCustomChecks';
  /** Whether custom checks is enabled for this variant. Non-null if useGraphSettings is false, otherwise null. */
  enableCustomChecks?: Maybe<Scalars['Boolean']['output']>;
  /** When true, indicates that graph-level configuration is used for this variant setting. The default at variant creation is true. */
  useGraphSettings: Scalars['Boolean']['output'];
};

export type VariantCheckConfigurationDowngradeChecks = {
  __typename?: 'VariantCheckConfigurationDowngradeChecks';
  /**
   *  During operation checks, if this option is enabled, the check will not fail or mark any operations as
   * broken/changed if the default value has changed, only if the default value is removed completely.
   */
  downgradeDefaultValueChange?: Maybe<Scalars['Boolean']['output']>;
  /**
   *  During operation checks, if this option is enabled, it evaluates a check run against zero operations
   * as a pass instead of a failure.
   */
  downgradeStaticChecks?: Maybe<Scalars['Boolean']['output']>;
  /**
   * When true, indicates that graph-level configuration is used for this variant setting. The default
   * at variant creation is true.
   */
  useGraphSettings: Scalars['Boolean']['output'];
};

export type VariantCheckConfigurationDownstreamVariants = {
  __typename?: 'VariantCheckConfigurationDownstreamVariants';
  /**
   * During downstream checks, this variant's check workflow will wait for all downstream check
   * workflows for <blockingDownstreamVariants> variants to complete, and if any of them fail, then
   * this variant's check workflow will fail.
   */
  blockingDownstreamVariants: Array<Scalars['String']['output']>;
};

export type VariantCheckConfigurationExcludedClients = {
  __typename?: 'VariantCheckConfigurationExcludedClients';
  /**
   * When true, indicates that graph-level configuration is appended to the variant-level
   * configuration. The default at variant creation is true.
   */
  appendGraphSettings: Scalars['Boolean']['output'];
  /**
   * During operation checks, ignore clients matching any of the <excludedClients> filters. The
   * default at variant creation is the empty list.
   */
  excludedClients: Array<ClientFilter>;
};

export type VariantCheckConfigurationExcludedOperations = {
  __typename?: 'VariantCheckConfigurationExcludedOperations';
  /**
   * When true, indicates that graph-level configuration is appended to the variant-level
   * configuration. The default at variant creation is true.
   */
  appendGraphSettings: Scalars['Boolean']['output'];
  /**
   * During operation checks, ignore operations matching any of the <excludedOperationNames> filters.
   * The default at variant creation is the empty list.
   */
  excludedOperationNames: Array<OperationNameFilter>;
  /**
   * During operation checks, ignore operations matching any of the <excludedOperations> filters. The
   * default at variant creation is the empty list.
   */
  excludedOperations: Array<OperationInfoFilter>;
};

export type VariantCheckConfigurationIncludedVariants = {
  __typename?: 'VariantCheckConfigurationIncludedVariants';
  /**
   * During operation checks, fetch operations from the metrics data for <includedVariants> variants.
   * Non-null if useGraphSettings is false and is otherwise null.
   */
  includedVariants?: Maybe<Array<Scalars['String']['output']>>;
  /**
   * When true, indicates that graph-level configuration is used for this variant setting. The default
   * at variant creation is true.
   */
  useGraphSettings: Scalars['Boolean']['output'];
};

export type VariantCheckConfigurationProposalChangeMismatchSeverity = {
  __typename?: 'VariantCheckConfigurationProposalChangeMismatchSeverity';
  /** How submitted build input diffs are handled when they match (or don't) a Proposal. Non-null if useGraphSettings is false and is otherwise null. */
  proposalChangeMismatchSeverity?: Maybe<ProposalChangeMismatchSeverity>;
  /** When true, indicates that graph-level configuration is used for this variant setting. The default at variant creation is true. */
  useGraphSettings: Scalars['Boolean']['output'];
};

export type VariantCheckConfigurationTimeRange = {
  __typename?: 'VariantCheckConfigurationTimeRange';
  /**
   * During operation checks, ignore operations that executed less than <operationCountThreshold>
   * times in the time range. Non-null if useGraphSettings is false and is otherwise null.
   */
  operationCountThreshold?: Maybe<Scalars['Int']['output']>;
  /**
   * Duration operation checks, ignore operations that constituted less than
   * <operationCountThresholdPercentage>% of the operations in the time range. Expected values are
   * between 0% and 5%. Non-null if useGraphSettings is false and is otherwise null.
   */
  operationCountThresholdPercentage?: Maybe<Scalars['Float']['output']>;
  /**
   * During operation checks, fetch operations from the last <timeRangeSeconds> seconds. Non-null if
   * useGraphSettings is false and is otherwise null.
   */
  timeRangeSeconds?: Maybe<Scalars['Long']['output']>;
  /**
   * When true, indicates that graph-level configuration is used for this variant setting. The default
   * at variant creation is true.
   */
  useGraphSettings: Scalars['Boolean']['output'];
};

export type VariantCreationConfig = {
  buildConfigInput: BuildConfigInput;
  endpointSlug?: InputMaybe<Scalars['String']['input']>;
  variantName: Scalars['String']['input'];
};

export enum ViolationLevel {
  Error = 'ERROR',
  Info = 'INFO',
  Warning = 'WARNING'
}

export type ListVariantsQueryVariables = Exact<{
  graphId: Scalars['ID']['input'];
}>;


export type ListVariantsQuery = { __typename?: 'Query', graph?: { __typename?: 'Graph', variants: Array<{ __typename?: 'GraphVariant', id: string, createdAt: any, name: string, isProposal?: boolean | null }> } | null };


export const ListVariantsDocument = gql`
    query ListVariants($graphId: ID!) {
  graph(id: $graphId) {
    variants {
      id
      createdAt
      name
      isProposal
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ListVariants(variables: ListVariantsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ListVariantsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ListVariantsQuery>({ document: ListVariantsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ListVariants', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;