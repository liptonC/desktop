import * as React from 'react'

import {FileStatus} from '../../models/status'

interface ChangedFileProps {
  path: string,
  status: FileStatus,
  onIncludedChange: (include: boolean) => void
}

interface ChangedFileState {
  include: boolean
}

/** a changed file in the working directory for a given repository */
export class ChangedFile extends React.Component<ChangedFileProps, ChangedFileState> {

  private static mapStatus(status: FileStatus): string {
    if (status === FileStatus.New) { return 'New' }
    if (status === FileStatus.Modified) { return 'Modified' }
    if (status === FileStatus.Deleted) { return 'Deleted' }
    return 'Unknown'
  }

  public constructor(props: ChangedFileProps) {
    super(props)

    this.state = { include: true }
  }

  private handleChange(event: React.FormEvent) {
    const include = (event.target as any).checked
    this.props.onIncludedChange(include)
    this.setState({ include })
  }

  public render() {
    return (
        <li>
          <input
            type='checkbox'
            defaultChecked={this.state.include}
            onChange={event => this.handleChange(event)}
          />
        <strong>{this.props.path}</strong> - {ChangedFile.mapStatus(this.props.status)}</li>
    )
  }
}