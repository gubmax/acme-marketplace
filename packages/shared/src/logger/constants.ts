import type { Colors } from 'picocolors/types.js'

export enum LogLevel {
	Trace = 'TRACE',
	Debug = 'DEBUG',
	Info = 'INFO',
	Warn = 'WARN',
	Error = 'ERROR',
	Fatal = 'FATAL',
}

export enum LogLevelWeight {
	Trace = 10,
	Debug = 20,
	Info = 30,
	Warn = 40,
	Error = 50,
	Fatal = 60,
}

export const COLOR_BY_TYPE: Record<string, keyof Colors> = {
	[LogLevel.Trace]: 'cyan',
	[LogLevel.Debug]: 'green',
	[LogLevel.Info]: 'blue',
	[LogLevel.Warn]: 'yellow',
	[LogLevel.Error]: 'red',
	[LogLevel.Fatal]: 'magenta',
}

export const LEVEL_BY_NUMBER: Record<string, LogLevel> = {
	[LogLevelWeight.Trace]: LogLevel.Trace,
	[LogLevelWeight.Debug]: LogLevel.Debug,
	[LogLevelWeight.Info]: LogLevel.Info,
	[LogLevelWeight.Warn]: LogLevel.Warn,
	[LogLevelWeight.Error]: LogLevel.Error,
	[LogLevelWeight.Fatal]: LogLevel.Fatal,
}
