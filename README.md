Kafka Docker Cluserter Repo - https://github.com/provectus/kafka-ui/blob/master/documentation/compose/kafka-cluster-sr-auth.yaml
dynamod vs hbase emr - https://docs.aws.amazon.com/whitepapers/latest/comparing-dynamodb-and-hbase-for-nosql/feature-summary.html



CLUSTER_ID=$(aws emr create-cluster --name "HBase Cluster with Coprocessor" \
  --release-label emr-6.5.0 \
  --applications Name=Hadoop Name=HBase \
  --ec2-attributes KeyName=your-key-pair \
  --instance-type m5.xlarge \
  --instance-count 3 \
  --use-default-roles \
  --output text --query 'ClusterId')

# Wait until the cluster is in WAITING state
aws emr wait cluster-running --cluster-id $CLUSTER_ID

# Step 1: Initialize HBase
aws emr add-steps --cluster-id $CLUSTER_ID --steps Type=CUSTOM_JAR,Name="InitHBase",ActionOnFailure=CONTINUE,Jar=command-runner.jar,Args=["hbase","org.apache.hadoop.hbase.util.hbck.HBaseFsck","-repair"]

# Step 2: Deploy Coprocessor
aws emr add-steps --cluster-id $CLUSTER_ID --steps Type=CUSTOM_JAR,Name="DeployCoprocessor",ActionOnFailure=CONTINUE,Jar=s3://your-bucket/your-coprocessor.jar,Args=[]

# Step 3: Add Coprocessor to HBase Table
aws emr add-steps --cluster-id $CLUSTER_ID --steps Type=STREAMING,Name="AddCoprocessor",ActionOnFailure=CONTINUE,Jar=command-runner.jar,Args=["hbase","shell","-e","alter 'your_table', 'coprocessor' => 'hdfs:///path/to/your-coprocessor.jar|org.example.MyCoprocessor|']"]

