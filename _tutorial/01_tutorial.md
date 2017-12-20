---
title: "Tutorial"
bg: darkblue
color: white
collection : stem-cell-commons
---

# Tutorial

Refinery is a data management, analysis, and visualization platform designed to support analysts in managing common tasks in analysis and interpretation of biomedical data. 

In this tutorial you will learn how to load data into Refinery, how to analyze it using workflows, and how to view analysis results using built-in visualization tools. Additionally, this tutorial demonstrates how to work with the data repository, how to use features that are supporting reproducible research, and how to use the collaboration tools of Refinery.

__Preparation__

To follow the steps of this tutorial, you will need a data set consisting of data files and a metadata file that is referencing your files.

<div class="tutorial-dataset" markdown="1">
__Tutorial Data Set__

This tutorial can be followed using the __Tutorial Data Set__, which consists of sample ChIP-seq data and their associated metadata file. Download the __Tutorial Data Set__ files here:
- [control (FASTQ)][input.fastq]
- [experimental (FASTQ)][nanog.fastq]
- [metadata (TSV)][tutorial.tsv]

Note the expanded instructions associated with some steps of the tutorial that pertain specifically to the __Tutorial Data Set__. Also, skip section __1. Creating a Metadata File__ since a metadata file is already provided within the __Tutorial Data Set__.
</div>

## 0. Accessing Refinery
{:.left}

- Go to the [Refinery Launch Pad][scc-home] and either
  - *create a new account*:
    1. Click *__Register__* at the top right of the navigation bar (top of page)
    2. Provide the required details and then click the *__Register__* button below
    3. Wait to receive an account activation e-mail at the address provided during registration
  - *log in to an account*:
    1. Click *__Login__* at the top right of the navigation bar
    2. Enter the *__Username or E-mail__* and *__Password__* provided during registration and click the *__Login__* button below

![NavBar](screenshots/NavBar_skitch.png)

## 1. Creating a Metadata File
{:.left}

- Create a metadata table within a delimited (e.g. tab-delimited) text file in which rows correspond to data files to be uploaded and columns provide metadata attributes (a template metadata file can be found [here][refinery-sample-metadata.tsv]). The naming and ordering of the columns can be arbitrary, but the metadata table 
  - *must* have 3 columns to describe *(1) sample identifiers, (2) filenames, (3) species identifiers*
    - Tip 1: Assigning these attributes to the first 3 columns of the table (same order as listed above) will slightly simplify the data set upload
    - Tip 2: *Filenames* should refer to data files either located on your local computer (do *not* include the file path) or on a web server accessible via public URLs (provide the full URL)
  - can contain as many additional columns as desired
  - *must* provide column names as its first row
  - *must* use column names that are unique, do *not* contain special characters, and are *not* the same as the following internally reserved metadata attribute names: *Assay_uuid, Django_ct, Django_id, File_uuid, Genome_build, Id, Is_annotation, Name, Species, Study_uuid, Type*
    - Tip: Descriptive yet concise names will be most effective

  <div class="tutorial-dataset" markdown="1">
  __Tutorial Data Set:__ skip this step since the tab-delimited `tutorial.tsv` metadata file is already provided
  </div>

## 2. Uploading a Data Set
{:.left}

1. From the *__Launch Pad__* (Refinery homepage), Click *__Upload__* from the *__Data Sets__* panel
![PanelHeaders](screenshots/PanelHeaders_skitch.png)
2. First choose delimiter used in the metadata file and then upload the file
    <div class="tutorial-dataset" markdown="1">
    __Tutorial Data Set:__ upload the tab-delimited `tutorial.tsv` metadata file
    </div>
3. Check metadata *__Preview of Meta Data File__* for accuracy (note: only first 5 samples are displayed)
4. Review *__Configure Metadata Import__* and make changes as needed
    <div class="tutorial-dataset" markdown="1">
    __Tutorial Data Set:__ no changes are needed
    </div>
5. Under *__Complete Submission__*, select *__Yes__* for *__Does the Data File Column refer to local files?__*
6. Click *__Add files…__* button and select data files corresponding to the metadata
    <div class="tutorial-dataset" markdown="1">
    __Tutorial Data Set:__ upload the `input.fastq` and `nanog.fastq` data files
    </div>
7. Click *__Start upload__* to begin uploading all selected data files
8. After all data files have uploaded, click *__Check Data Files__* to confirm all files are now on the Refinery server
9. Click *__Submit__* to upload the new data set (metadata + data files)

![UploadDataSet](screenshots/UploadDataSet_skitch.png)

## 3. Viewing a Data Set Summary in the Data Set Browser
{:.left}

- Return to the *__Launch Pad__* and click on the newly uploaded data set title. The *__Data Set Browser__* will display a summary of the data set.

![DataSetBrowser](screenshots/DataSetBrowser_skitch.png)

## 4. Exploring Data Set Contents in the File Browser
{:.left}

- From the *__Data Set Browser__*, click *__View Content in File Browser__* (or the equivalent icon in the *__Data Sets__* panel) to view the individual data files belonging to the data set:
  - Files can be filtered based on attributes (e.g. column names of the related metadata file) using the *__Attribute Filter__* in the left-hand panel
  - Files can also be sorted according to attributes (both ascending and descending) by clicking the attribute names (i.e. column headers)

![FileBrowser](screenshots/FileBrowser_skitch.png)

## 5. Launching an Analysis
{:.left}

1. From the *__File Browser__*, click the *__Show Tool Panel__* button above the left-hand panel
![Analyze](screenshots/Analyze_skitch.png)
2. Select one of the analysis workflows below using the drop-down menu in the *__Tool Panel__*, follow their workflow-specific steps below, and then continue with step 3
    <div class="tutorial-dataset" markdown="1">
    __Tutorial Data Set:__ follow section __5. Launching an Analysis__ twice, first launching the *__FastQC__* workflow and afterwards the *__ChIP-seq Peak Calling - Human__* workflow (details below)
    </div>
  - *__FastQC__*
    - Select file(s) to analyze by first clicking the arrow next to a file and then ticking its checkbox in the *__Select Tool Input__* popover
        <div class="tutorial-dataset" markdown="1">
        __Tutorial Data Set:__ select both `input.fastq` and `nanog.fastq`
        </div>
  ![AnalyzeFastQC](screenshots/AnalyzeFastQC_skitch.png)
  - *__ChIP-seq Peak Calling - Human__*
    - Select files to analyze by first clicking the arrow next to a file and then ticking its checkbox in the *__Select Tool Input__* popover, appropriately assigning *__Treatment FASTQ__* and *__Control FASTQ__* inputs
        <div class="tutorial-dataset" markdown="1">
        __Tutorial Data Set:__ assign `input.fastq` to the *__Control FASTQ__* and `nanog.fastq` to the *__Treatment FASTQ__*
        </div>
  ![AnalyzeChIPseq](screenshots/AnalyzeChIPseq_skitch.png)

3. Click the *__Launch__* button
4. Monitor analysis progress within the *__File Browser__*
  - Tip: This *__Analyses__* tab within the *__File Browser__* can also be directly accessed by clicking the analysis name from the *__Analyses__* panel on the *__Launch Pad__*
![AnalysisStatus](screenshots/AnalysisStatus_skitch.png)

## 6. Viewing Analysis Results
{:.left}

1. Upon successful completion of an analysis, click its name from the *__Analyses__* tab within the *__File Browser__*
![ViewAnalysisResults](screenshots/ViewAnalysisResults_skitch.png)
2. To visualize __peak calling__ results, select input files to be displayed as tracks in IGV (e.g. BED, bigWig)
  - Tip: To download any results file, click the down-pointing arrow icon associated with that file
3. Launch *__IGV__*
    <div class="tutorial-dataset" markdown="1">
    __Tutorial Data Set:__ search *__chr12:1-35,000,000__* in the IGV search box (top left) to see all the peaks__
    </div>
![ChIPseqResults1](screenshots/ChIPseqResults1_skitch.png)
![ChIPseqResults2](screenshots/ChIPseqResults2_skitch.png)

## 7. Reviewing Data Provenance
{:.left}

1. Display a data set in the *__File Browser__* (see sections __3. Viewing a Data Set Summary in the Data Set Browser__ and __4. Exploring Data Set Contents in the File Browser__)
2. Select the *__Provenance__* tab
3. Review the displayed nodes to track the analysis history of the data set -- each new analysis will add a new node to the provenance graph

## 8. Creating and Modifying a Collaboration Group
{:.left}

- Click *__Collaboration__* within the navigation bar and then
  - *create a new group*
    1. Click the *__Add__* button in the top right of the *__Groups__* panel
    2. Choose a unique *__Group name__* and click *__Create group__*
    3. Select the new group within the *__Groups__* panel to display current members of the group within the *__Members__* panel
  - *invite new group members*
    1. Select a group within the *__Groups__* panel and click the *__Invite__* button in the top right of the *__Members__* panel
    2. Provide a *__Recipient email__* address belonging to the new group member and click *__Send Invite__*
      - The new group member will then receive an invitation e-mail with instructions on how to join the group
  
  ![Collaboration](screenshots/Collaboration_skitch.png)

## 9. Sharing a Data Set with a Collaboration Group
{:.left}

1. Display a data set in the *__Data Set Browser__* (see section __3. Viewing a Data Set Summary in the Data Set Browser__)
2. Click *__Share__* above the data set summary
3. Assign *__Read-only__* or *__Modify__* permissions for that data set to any groups to which you belong
![Share](screenshots/Share_skitch.png)

## 10. Deleting an Analysis or Data Set
{:.left}

1. To delete an analysis only, click the trash can icon in the *__Analyses__* panel on the *__Launch Pad__*. To delete a data set and all its associated analyses, click the trash can icon in the *__Data Sets__* panel on the *__Launch Pad__*.
![Delete](screenshots/Delete_skitch.png)

[refinery-sample-metadata.tsv]: https://beta.stemcellcommons.org/static/sample-files/refinery-sample-metadata.tsv
[scc-home]: https://beta.stemcellcommons.org
[input.fastq]: http://data.cloud.refinery-platform.org.s3.amazonaws.com/data/tutorials/introduction/input.fastq
[nanog.fastq]: http://data.cloud.refinery-platform.org.s3.amazonaws.com/data/tutorials/introduction/nanog.fastq
[tutorial.tsv]: http://data.cloud.refinery-platform.org.s3.amazonaws.com/data/tutorials/introduction/tutorial.tsv
